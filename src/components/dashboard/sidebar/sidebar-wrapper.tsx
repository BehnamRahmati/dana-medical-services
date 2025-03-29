'use client'
import useSidebar from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import React from 'react'

export default function DashboardSidebarWrapper({ className, ...props }: React.ComponentProps<'div'>) {
	const { isOpen } = useSidebar()
	return (
		<aside className={`transition-[width] duration-300 ${isOpen ? 'w-80' : 'w-[calc(var(--spacing)*25)]'}`}>
			<div
				className={`p-5 bg-accent rounded-2xl h-[calc(100dvh-var(--spacing)*10)] ${isOpen ? 'w-[calc(var(--spacing)*75)]' : 'w-[calc(var(--spacing)*20)]'} transition-[width] duration-300 fixed top-5 bottom-5 right-5 overflow-hidden`}
			>
				<div className={cn(`h-full flex flex-col overflow-hidden`, className)} {...props} />
			</div>
		</aside>
	)
}
