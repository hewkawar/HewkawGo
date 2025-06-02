import { getDB, initializeTable } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
    const db = await getDB();

    await initializeTable(db);

    const total = await db.prepare("SELECT id FROM links").all();

    return NextResponse.json({
        ok: true,
        static: {
            total: total.results.length,
        }
    });
}