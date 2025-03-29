'use client'
import useCollapsible from '@/hooks/use-callapsible'
import React from 'react'

export default function DashboardSidebarCollapsibleContent({ children }: { children: React.ReactNode }) {
	const { isOpen } = useCollapsible()
	return <div className={`${isOpen ? 'h-auto' : 'h-0'} overflow-hidden`}>{children}</div>
}
