'use client'
import { SidebarContext } from '@/components/dashboard/sidebar/sidebar-provider'
import React from 'react'

export default function useSidebar() {
	const context = React.useContext(SidebarContext)
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider.')
	}

	return context
}
