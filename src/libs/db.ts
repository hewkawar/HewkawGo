import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getDB() {
    const db = (await getCloudflareContext({ async: true })).env.DB;
    return db;
}

export async function initializeTable(db: D1Database) {
    await db.exec("CREATE TABLE IF NOT EXISTS links (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, url TEXT NOT NULL, target TEXT NOT NULL, owner TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)");
}