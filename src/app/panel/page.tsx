import React from 'react'
import PanelClientPage from './client'
import { getSite } from '@/libs/site'

export default function Panel() {
    const site = getSite();

    return (
        <div className='my-16 container'>
            <h1 className="text-4xl font-bold text-center">ลิ้งค์ของฉัน</h1>
            <PanelClientPage site={site} />
        </div>
    )
}
