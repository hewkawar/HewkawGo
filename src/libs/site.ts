import { Site } from "@/types/interface";

export function getSite(): Site {
    return {
        name: process.env.SITE_NAME,
        url: process.env.SITE_URL,
    }
}