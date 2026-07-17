import React from 'react'
import { Outlet } from 'react-router-dom'
import PublicNavBar from '@/components/Layout/PublicNavBar'
import PublicFooter from '@/components/Layout/PublicFooter'

export default function PublicLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <PublicNavBar />
            <main className="flex-1">
                <Outlet />
            </main>
            <PublicFooter />
        </div>
    )
}