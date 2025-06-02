import { authOptions } from "@/configs/authOption.config";
import { generateRandomString } from "@/functions/string";
import { getDB, initializeTable } from "@/libs/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({
            ok: false,
            error: "Unauthorized"
        }, { status: 401 });
    }

    const db = await getDB();
    await initializeTable(db);

    const owner = session.user.id;

    const links = await db.query("SELECT id, name, url, target, created_at, updated_at FROM links WHERE owner = $1", [owner]);
    
    return NextResponse.json(links);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({
            ok: false,
            error: "Unauthorized"
        }, { status: 401 });
    }

    const owner = session.user.id;

    const body = await req.text();

    const { name, url, target } = JSON.parse(body || "{}");

    if (!name || !target) {
        return NextResponse.json({
            ok: false,
            error: "Missing required fields"
        }, { status: 400 });
    }

    let newUrl: string = url ? url : generateRandomString(6);

    newUrl = newUrl.replace(/[^a-zA-Z0-9-_]/g, "");

    if (newUrl.startsWith("panel") || newUrl.startsWith("admin") || newUrl.startsWith("dashboard")) {
        return NextResponse.json({
            ok: false,
            error: "Invalid URL prefix"
        }, { status: 400 });
    }

    const db = await getDB();

    await initializeTable(db);

    const existingLink = await db.query("SELECT id FROM links WHERE url = $1", [newUrl]);

    if (existingLink.length > 0) {
        return NextResponse.json({
            ok: false,
            error: "Link with this URL already exists"
        }, { status: 400 });
    }

    await db.query("INSERT INTO links (name, url, target, owner) VALUES ($1, $2, $3, $4)", [name, newUrl, target, owner]);

    return NextResponse.json({
        ok: true,
        message: "Link created successfully",
        data: {
            name,
            url: newUrl,
            target,
        }
    });
}