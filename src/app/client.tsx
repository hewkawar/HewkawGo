"use client";
import { Site } from '@/types/interface';
import { signIn, signOut, useSession } from 'next-auth/react';
import { TypeAnimation } from 'react-type-animation'
import Image from 'next/image';

import DiscordSymbol from '@/assets/Discord-Symbol-Blurple.svg';
import { Button } from '@radix-ui/themes';
import { ListIcon, LogOutIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomeClientPage({ site }: { site: Site }) {
    const session = useSession();

    const router = useRouter();

    return (
        <>
            <TypeAnimation
                sequence={[
                    'https://www.youtube.com/watch?v=dQw4w9WgXcQ?si=A4yGvlGli8R4eKOq',
                    1000,
                    `${site.url}/bfsa2i`,
                    1000,
                ]}
                repeat={Infinity}
                speed={10}
            />

            {
                session.status == 'authenticated' ? (
                    <div className='mt-6 flex gap-2'>
                        <Button color='green' variant='soft'><PlusIcon size={16} /> ย่อลิ้งค์</Button>
                        <Button color='blue' variant='soft' onClick={() => router.push("/panel")}><ListIcon size={16} /> แก้ไขลิ้งค์ของฉัน</Button>
                        <Button color='red' variant='soft' onClick={() => signOut()}><LogOutIcon size={16} /> ออกจากระบบ</Button>
                    </div>
                ) : (
                    <div className='mt-6'>
                        <button className='py-2 px-4 rounded-lg ring-1 ring-blue-500 cursor-pointer flex items-center gap-2 shadow-blue-500 transition-all hover:-translate-1 hover:shadow-lg hover:ring-2' onClick={() => signIn("discord")}>
                            <Image src={DiscordSymbol} width={24} height={24} alt='Discord' />
                            Login with Discord
                        </button>
                    </div>
                )
            }
        </>
    )
}