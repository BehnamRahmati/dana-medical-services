'use client'
import { SelectContext } from '@/components/ui/select'
import React from 'react'

export default function useSelect() {
	const context = React.useContext(SelectContext)
	if (!context) {
		throw new Error('useSelect must be used within a SidebarProvider.')
	}

	return context
}
