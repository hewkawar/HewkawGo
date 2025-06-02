import { getDB, initializeTable } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
    const db = await getDB();

    await initializeTable(db);

    const total = await db.query("SELECT id FROM links");

    return NextResponse.json({
        ok: true,
        static: {
            total: total.length,
        }
    });
}