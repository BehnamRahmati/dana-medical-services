'use client'
import {
	SidebarCollapsible,
	SidebarCollapsibleContent,
	SidebarCollapsibleTrigger,
	SidebarMenu,
	SidebarMenuItem,
} from '@/components/ui/sidebar-custom'
import { AddSquare, HambergerMenu, HashtagSquare, I3DSquare } from 'iconsax-react'
import Link from 'next/link'

const links = [
	{
		label: 'مشاهده همه خدمات',
		icon: <HambergerMenu className='size-5 stroke-content/60 ' variant='Broken' />,
		href: '/dashboard/services',
	},
	{
		label: 'نوشتن خدمت جدید',
		icon: <AddSquare className='size-5 stroke-content/60' variant='Broken' />,
		href: '/dashboard/services/create',
	},
	{
		label: 'دسته بندی های خدمات',
		icon: <HashtagSquare className='size-5 stroke-content/60' variant='Broken' />,
		href: '/dashboard/services/categories',
	},
]

export default function DashboardSidebarServices({ setOpen }: { setOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {
	return (
		<SidebarCollapsible>
			<SidebarCollapsibleTrigger title='خدمات'>
				<I3DSquare variant='Broken' />
			</SidebarCollapsibleTrigger>
			<SidebarCollapsibleContent>
				<SidebarMenu isSubMenu>
					{links.map((link, index) => (
						<SidebarMenuItem key={index}>
							<Link
								href={link.href}
								onClick={() => setOpen && setOpen(prev => !prev)}
								className='flex items-center gap-2.5 *:shrink-0'
							>
								{link.icon}
								<span>{link.label}</span>
							</Link>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarCollapsibleContent>
		</SidebarCollapsible>
	)
}
