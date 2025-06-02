"use client";

import { Site } from "@/types/interface";
import { Box, Button, Dialog, Flex, RadioCards, Text, TextField } from "@radix-ui/themes";
import { PinIcon, ShuffleIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddLink({ trigger, site }: { trigger: React.ReactNode; site: Site; }) {
    const [url, setUrl] = useState("");
    const [name, setName] = useState("ลิ้งค์ใหม่");

    const [linkType, setLinkType] = useState<"random" | "custom">("random");
    const [customLink, setCustomLink] = useState("");

    async function addLink() {
        await toast.promise(fetch("/api/links", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                url: linkType === "custom" ? customLink : undefined,
                target: url
            }),
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((data) => {
                    throw new Error(data.error || "เกิดข้อผิดพลาดในการสร้างลิ้งค์");
                });
            }
            return res;
        }), {
            loading: "กำลังสร้างลิ้งค์...",
            success: "สร้างลิ้งค์เรียบร้อยแล้ว",
            error: (err) => {
                return err.error || "เกิดข้อผิดพลาดในการสร้างลิ้งค์";
            }
        });

        setUrl("");
        setName("ลิ้งค์ใหม่");
        setLinkType("random");
        setCustomLink("");
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                {trigger}
            </Dialog.Trigger>

            <Dialog.Content maxWidth="500px">
                <Dialog.Title>ย่อลิ้งค์</Dialog.Title>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">URL ที่ต้องการ</Text>
                        <TextField.Root
                            placeholder="URL ที่ต้องการ"
                            type="url"
                            required
                            onChange={(e) => setUrl(e.target.value)}
                            defaultValue={url}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">ชื่อลิ้งค์</Text>
                        <TextField.Root
                            defaultValue={name}
                            placeholder="ชื่อลิ้งค์"
                            type="text"
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">ประเภทลิ้งค์</Text>

                        <Box>
                            <RadioCards.Root defaultValue={linkType} orientation="horizontal">
                                <RadioCards.Item value="random" onClick={() => setLinkType("random")}>
                                    <Flex direction="row" width="100%" gap="2" align="center">
                                        <ShuffleIcon size={16} />
                                        <Text>ลิ้งค์แบบสุ่ม</Text>
                                    </Flex>
                                </RadioCards.Item>
                                <RadioCards.Item value="custom" onClick={() => setLinkType("custom")}>
                                    <Flex direction="row" width="100%" gap="2" align="center">
                                        <PinIcon size={16} />
                                        <Text>ลิ้งค์แบบกำหนดเอง</Text>
                                    </Flex>
                                </RadioCards.Item>
                            </RadioCards.Root>
                        </Box>
                    </label>

                    {
                        linkType === "custom" && (
                            <>
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">ลิ้งค์ที่ต้องการ</Text>
                                    <TextField.Root
                                        placeholder="ลิ้งค์ที่ต้องการ"
                                        type="text"
                                        required
                                        onChange={(e) => setCustomLink(e.target.value)}
                                        defaultValue={customLink}
                                    />
                                    <Text size="2" mt="1">ตัวอย่าง: {site.url}/{customLink}</Text>
                                </label>
                            </>
                        )
                    }
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">ยกเลิก</Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button color="green" onClick={addLink}>สร้าง</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}