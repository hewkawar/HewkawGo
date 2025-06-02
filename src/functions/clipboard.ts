"use client";

import toast from "react-hot-toast";

export function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)

    toast.success("คัดลอกไปยังคลิปบอร์ดแล้ว")
}