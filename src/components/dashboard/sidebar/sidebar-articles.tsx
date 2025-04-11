'use client'
import {
	SidebarCollapsible,
	SidebarCollapsibleContent,
	SidebarCollapsibleTrigger,
	SidebarMenu,
	SidebarMenuItem,
} from '@/components/ui/sidebar-custom'
import { AddSquare, Cards, HambergerMenu, HashtagSquare, Tag } from 'iconsax-react'
import Link from 'next/link'

const links = [
	{
		label: 'مشاهده همه مقالات',
		icon: <HambergerMenu className='size-5 stroke-content/60 ' variant='Broken' />,
		href: '/dashboard/articles',
	},
	{
		label: 'نوشتن مقاله جدید',
		icon: <AddSquare className='size-5 stroke-content/60' variant='Broken' />,
		href: '/dashboard/articles/create',
	},
	{
		label: 'دسته بندی های مقالات',
		icon: <HashtagSquare className='size-5 stroke-content/60' variant='Broken' />,
		href: '/dashboard/articles/categories',
	},
	{
		label: ' تگ های مقالات',
		icon: <Tag className='size-5 stroke-content/60' variant='Broken' />,
		href: '/dashboard/articles/tags',
	},
]

export default function DashboardSidebarArticles({ setOpen }: { setOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {
	return (
		<SidebarCollapsible>
			<SidebarCollapsibleTrigger title='مقالات'>
				<Cards variant='Broken' />
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
