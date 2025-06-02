"use client";
import { Site } from '@/types/interface';
import { TypeAnimation } from 'react-type-animation'

export default function HomeClientPage({ site }: { site: Site }) {
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
        </>
    )
}