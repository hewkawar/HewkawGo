import { getDB, initializeTable } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ url: string }> }) {
    const db = await getDB();
    const { url } = await params;

    if (!url) {
        return NextResponse.json({
            ok: false,
            error: "Missing URL parameter"
        }, { status: 400 });
    }

    await initializeTable(db);

    const total = await db.prepare("SELECT * FROM links WHERE url = ?").bind(url).first();

    if (!total) {
        return NextResponse.json({
            ok: false,
            error: "Link not found"
        }, { status: 404 });
    }

    return NextResponse.json({
        ok: true,
        data: total
    });
}