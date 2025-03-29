'use client'
import { CollapsibleContext } from '@/components/dashboard/sidebar/sidebar-collapsible'
import React from 'react'

export default function useCollapsible() {
	const context = React.useContext(CollapsibleContext)
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider.')
	}

	return context
}
