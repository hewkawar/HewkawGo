"use client";

import AddLink from "@/components/AddLink";
import { copyToClipboard } from "@/functions/clipboard";
import { generateQRCode } from "@/functions/qrcode";
import { LinkRow, Site } from "@/types/interface";
import { AlertDialog, Button, Dialog, Flex, Table } from "@radix-ui/themes";
import { ArrowDownToLineIcon, CopyIcon, PlusIcon, QrCodeIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PanelClientPage({ site }: { site: Site }) {
    const [links, setLinks] = useState<LinkRow[]>([]);

    async function downloadQRCode(url: string) {
        const data = await generateQRCode({ data: `${site.url}/${url}`, size: 256 });

        const res = await fetch(data);
        const blob = await res.blob();

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${url}.png`;
        link.click();
        URL.revokeObjectURL(link.href);
        toast.success("ดาวน์โหลด QR Code สำเร็จ");
    }

    async function fetchLinks() {
        const res = await fetch("/api/links");
        if (!res.ok) {
            throw new Error("Failed to fetch links");
        }
        const data = await res.json();
        setLinks(data);
    }

    async function deleteLink(name: string) {
        toast.promise(fetch(`/api/links/${name}`, {
            method: "DELETE",
        }), {
            loading: "กำลังลบลิ้งค์...",
            success: () => {
                fetchLinks();
                return "ลิ้งค์ถูกลบเรียบร้อยแล้ว";
            },
            error: (err) => {
                return err.error || "เกิดข้อผิดพลาดในการลบลิ้งค์";
            }
        })
    }

    useEffect(() => {
        fetchLinks();
    }, []);

    return (
        <>
            <div className="flex justify-end my-4 gap-2">
                <AddLink trigger={(<Button color='green' variant='soft'><PlusIcon size={16} /> ย่อลิ้งค์</Button>)} site={site} onSuccess={fetchLinks} />
            </div>
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
                                                <Flex gap="2">
                                                    <Dialog.Root>
                                                        <Dialog.Trigger>
                                                            <Button color="blue" variant="soft"><QrCodeIcon size={16} /></Button>
                                                        </Dialog.Trigger>

                                                        <Dialog.Content maxWidth="450px">
                                                            <Dialog.Title>QR Code</Dialog.Title>

                                                            <Flex direction="column" gap="6" align="center">
                                                                <QRCodeSVG
                                                                    value={`${site.url}/${link.url}`}
                                                                    size={128}
                                                                    bgColor='#fff'
                                                                    fgColor='#000'
                                                                    level="Q"
                                                                    includeMargin={true}
                                                                />

                                                                <Button variant="ghost" color="blue" onClick={() => downloadQRCode(link.url)}>
                                                                    <ArrowDownToLineIcon size={16} />
                                                                    ดาวน์โหลด QR Code
                                                                </Button>
                                                            </Flex>

                                                            <Flex gap="3" mt="4" justify="end">
                                                                <Dialog.Close>
                                                                    <Button variant="soft" color="gray">ปิด</Button>
                                                                </Dialog.Close>
                                                            </Flex>
                                                        </Dialog.Content>
                                                    </Dialog.Root>

                                                    <AlertDialog.Root>
                                                        <AlertDialog.Trigger>
                                                            <Button color="red" variant="soft"><Trash2Icon size={16} /></Button>
                                                        </AlertDialog.Trigger>
                                                        <AlertDialog.Content maxWidth="450px">
                                                            <AlertDialog.Title>ลบลิ้งค์ย่อ?</AlertDialog.Title>
                                                            <AlertDialog.Description size="2">
                                                                คุณแน่ใจหรือไม่ว่าต้องการลบลิ้งค์ <strong>{link.name}</strong>?
                                                                <br />
                                                                การดำเนินการนี้จะไม่สามารถกู้คืนได้
                                                            </AlertDialog.Description>

                                                            <Flex gap="3" mt="4" justify="end">
                                                                <AlertDialog.Cancel>
                                                                    <Button variant="soft" color="gray">ยกเลิก</Button>
                                                                </AlertDialog.Cancel>
                                                                <AlertDialog.Action>
                                                                    <Button variant="solid" color="red" onClick={() => deleteLink(link.url)}>ยืนยันการลบ</Button>
                                                                </AlertDialog.Action>
                                                            </Flex>
                                                        </AlertDialog.Content>
                                                    </AlertDialog.Root>
                                                </Flex>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                }
                            </Table.Body>
                        </Table.Root>
                    ) : (
                        <>
                            <p className="text-center text-gray-500 mt-6">ยังไม่มีลิ้งค์ย่อ</p>
                            <p className="text-center text-gray-500">เริ่มต้นสร้างลิ้งค์ย่อได้เลย!</p>
                        </>
                    )
                }
            </div>
        </>
    )
}