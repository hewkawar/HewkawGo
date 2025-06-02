import { generateRandomString } from "@/functions/string";
import { getDB, initializeTable } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.text();

    const { name, url, target, owner } = JSON.parse(body || "{}");

    if (!name || !target || !owner) {
        return NextResponse.json({
            ok: false,
            error: "Missing required fields"
        }, { status: 400 });
    }

    let newUrl = url ? url : generateRandomString(6);

    const db = await getDB();

    await initializeTable(db);

    const now = Date.now();
    
    const existingLink = await db.prepare("SELECT id FROM links WHERE url = ?").bind(newUrl).first();

    if (existingLink) {
        newUrl = generateRandomString(6);
        const checkAgain = await db.prepare("SELECT id FROM links WHERE url = ?").bind(newUrl).first();
        if (checkAgain) {
            generateRandomString(6);
        }
    }

    await db.prepare("INSERT INTO links (name, url, target, owner, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)")
        .bind(name, newUrl, target, owner, now, now)
        .run();

    return NextResponse.json({
        ok: true,
        message: "Link created successfully",
    });
}