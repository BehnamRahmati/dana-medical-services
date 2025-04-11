'use client'
import {
	SidebarCollapsible,
	SidebarCollapsibleContent,
	SidebarCollapsibleTrigger,
	SidebarMenu,
	SidebarMenuItem,
} from '@/components/ui/sidebar-custom'
import { Fatrows, HambergerMenu } from 'iconsax-react'
import Link from 'next/link'

const links = [
	{
		label: 'مشاهده همه منو ها',
		icon: <HambergerMenu className='size-5 stroke-content/60 ' variant='Broken' />,
		href: '/dashboard/menus',
	},
]

export default function DashboardSidebarMenus({ setOpen }: { setOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {
	return (
		<SidebarCollapsible>
			<SidebarCollapsibleTrigger title='منو ها'>
				<Fatrows variant='Broken' />
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
