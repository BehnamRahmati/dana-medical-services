'use client'
import useCollapsible from '@/hooks/use-callapsible'
import { ArrowDown2, ArrowLeft2 } from 'iconsax-react'
import React from 'react'

export default function DashboardSidebarCollapsibleTriger({ children, title }: { children: React.ReactNode; title: string }) {
	const { isOpen, setIsOpen } = useCollapsible()
	return (
		<div className='flex items-center justify-between gap-2 w-full py-1' onClick={() => setIsOpen(prev => !prev)}>
			<div className='flex items-center flex-1 gap-2 *:shrink-0 cursor-pointer group '>
				<div className='*:h-8.5 *:stroke-content *:transform group-hover:*:scale-110 *:p-1 *:transition-transform *:duration:200'>
					{children}
				</div>

				<p className='text-lg font-bold px-2.5 pb-1 pt-2 leading-6 rounded-lg'>{title}</p>
			</div>
			{isOpen ? (
				<ArrowDown2 className='fill-content size-5' variant='Bulk' />
			) : (
				<ArrowLeft2 className='fill-content size-5' variant='Bulk' />
			)}
		</div>
	)
}
