'use client'
import React from 'react'

type TSidebarContext = {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const SidebarContext = React.createContext<TSidebarContext | undefined>(undefined)

export default function DashboardSidebarProvider({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = React.useState(false)
	return <SidebarContext value={{ isOpen, setIsOpen }}>{children}</SidebarContext>
}
