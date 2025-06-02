"use client";

import { copyToClipboard } from "@/functions/clipboard";
import { LinkRow, Site } from "@/types/interface";
import { Button, Flex, Table } from "@radix-ui/themes";
import { CopyIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PanelClientPage({ site }: { site: Site }) {
    const [links, setLinks] = useState<LinkRow[]>([]);

    async function fetchLinks() {
        const res = await fetch("/api/links");
        if (!res.ok) {
            throw new Error("Failed to fetch links");
        }
        const data = await res.json();
        setLinks(data);
    }

    useEffect(() => {
        fetchLinks();
    }, []);

    return (
        <div>
            {
                links.length > 0 ? (
                    <Table.Root>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>ชื่อ</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>ลิ้งค์</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>ปลายทาง</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>สร้างเมื่อ</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>ดำเนินการ</Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                links.map((link) => (
                                    <Table.Row key={link.id}>
                                        <Table.RowHeaderCell>{link.id}</Table.RowHeaderCell>
                                        <Table.Cell>{link.name}</Table.Cell>
                                        <Table.Cell>
                                            <Flex gap="2">
                                                <Link href={`${site.url}/${link.url}`} className="text-blue-400 hover:underline transition-colors" target="_blank">{site.url}/{link.url}</Link>
                                                <button onClick={() => copyToClipboard(`${site.url}/${link.url}`)} className="cursor-pointer hover:bg-white/20 p-1.5 rounded-full transition-colors"><CopyIcon size={12} /></button>
                                            </Flex>
                                        </Table.Cell>
                                        <Table.Cell>{link.target}</Table.Cell>
                                        <Table.Cell>{new Date(link.created_at).toLocaleString("th", { dateStyle: "medium", timeStyle: "short" })}</Table.Cell>
                                        <Table.Cell>
                                            <Flex>
                                                <Button color="red" variant="soft"><Trash2Icon size={16} /></Button>
                                            </Flex>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table.Root>
                ) : (
                    <></>
                )
            }
        </div>
    )
}