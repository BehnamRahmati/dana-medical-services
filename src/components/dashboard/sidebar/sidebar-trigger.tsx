'use client'
import useSidebar from '@/hooks/use-sidebar'
import { SidebarLeft, SidebarRight } from 'iconsax-react'

export default function DashboardSidebarTrigger() {
	const { isOpen, setIsOpen } = useSidebar()
	return (
		<button
			type='button'
			className='flex items-center gap-1.5 *:shrink-0 group *:transition-transform *:duration:200'
			onClick={() => setIsOpen(prev => !prev)}
		>
			{isOpen ? (
				<SidebarRight
					className='size-8.5 stroke-content transform group-hover:scale-110 p-1 rounded-lg'
					variant='Broken'
				/>
			) : (
				<SidebarLeft
					className='size-8.5 stroke-content transform group-hover:scale-110 p-1 rounded-lg'
					variant='Broken'
				/>
			)}
			<p className=' px-2.5 pb-1 pt-1.5 rounded-lg'>باز و بسته کردن سایدبار</p>
		</button>
	)
}
