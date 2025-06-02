import { getDB } from "@/libs/db";
import { notFound, redirect } from "next/navigation";

export default async function LinkRedirect({ params }: { params: Promise<{ link: string }> }) {
    const { link } = await params;

    if (!link) {
        return notFound();
    }

    const db = await getDB();

    const result = await db.query("SELECT target FROM links WHERE url = $1", [link]);

    if (result.length === 0) {
        return notFound();
    }

    const target = result[0].target;

    if (!target) {
        return notFound();
    }

    return redirect(target);
}