"use client";

import { Site } from "@/types/interface";
import { Box, Button, Dialog, Flex, RadioCards, Text, TextField } from "@radix-ui/themes";
import { PinIcon, ShuffleIcon } from "lucide-react";
import { useState } from "react";

export default function AddLink({ trigger, site }: { trigger: React.ReactNode; site: Site; }) {
    const [customLink, setCustomLink] = useState("");
    const [linkType, setLinkType] = useState<"random" | "custom">("random");

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
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">ชื่อลิ้งค์</Text>
                        <TextField.Root
                            defaultValue="ลิ้งค์ใหม่"
                            placeholder="ชื่อลิ้งค์"
                            type="text"
                            required
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
                    <Button color="green">สร้าง</Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}