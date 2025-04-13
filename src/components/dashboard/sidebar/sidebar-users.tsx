'use client'
import {
	SidebarCollapsible,
	SidebarCollapsibleContent,
	SidebarCollapsibleTrigger,
	SidebarMenu,
	SidebarMenuItem,
} from '@/components/ui/sidebar-custom'
import { HambergerMenu, Profile2User } from 'iconsax-react'
import Link from 'next/dist/client/link'

const links = [
	{
		label: 'مشاهده همه  کاربران',
		icon: <HambergerMenu className='size-5 stroke-content/60 ' variant='Broken' />,
		href: '/dashboard/users',
	},
]

export default function DashboardSidebarUsers({ setOpen }: { setOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {
	return (
		<SidebarCollapsible>
			<SidebarCollapsibleTrigger title='کاربران'>
				<Profile2User variant='Broken' />
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
