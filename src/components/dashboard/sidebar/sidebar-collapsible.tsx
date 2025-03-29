'use client'
import React from 'react'

type TCollapsibleContext = {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CollapsibleContext = React.createContext<TCollapsibleContext | null>(null)

export default function DashboardCollapsible({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = React.useState(false)
	return (
		<CollapsibleContext.Provider value={{ isOpen, setIsOpen }}>
			<div className='flex flex-col w-full'>{children}</div>
		</CollapsibleContext.Provider>
	)
}
