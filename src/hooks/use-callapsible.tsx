'use client'
import { CollapsibleContext } from '@/components/ui/sidebar-custom'
import React from 'react'

export default function useCollapsible() {
	const context = React.useContext(CollapsibleContext)
	if (!context) {
		throw new Error('useCollapsible must be used within a SidebarProvider.')
	}

	return context
}
