import { neon, NeonQueryFunction } from '@neondatabase/serverless';

const DB_URL = process.env.DATABASE_URL;

export async function getDB() {
    if (!DB_URL) {
        throw new Error("DATABASE_URL is not defined in the environment variables.");
    }

    const db = neon(DB_URL);

    return db;
}

export async function initializeTable(db: NeonQueryFunction<false, false>) {
    await db.query("CREATE TABLE IF NOT EXISTS links (id INTEGER PRIMARY KEY, name TEXT NOT NULL, url TEXT NOT NULL, target TEXT NOT NULL, owner TEXT NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW())");
}