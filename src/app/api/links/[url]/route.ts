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

    const total = await db.query("SELECT id, name, url, target, created_at, updated_at FROM links WHERE url = $1", [url]);

    if (total.length === 0) {
        return NextResponse.json({
            ok: false,
            error: "Link not found"
        }, { status: 404 });
    }

    return NextResponse.json(total[0]);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ url: string }> }) {
    const db = await getDB();
    const { url } = await params;

    if (!url) {
        return NextResponse.json({
            ok: false,
            error: "Missing URL parameter"
        }, { status: 400 });
    }

    await initializeTable(db);

    const result = await db.query("DELETE FROM links WHERE url = $1 RETURNING id", [url]);

    if (result.length === 0) {
        return NextResponse.json({
            ok: false,
            error: "Link not found"
        }, { status: 404 });
    }

    return NextResponse.json(undefined, {
        status: 204
    })
}