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

export default function DashboardSidebarUsers() {
	return (
		<SidebarCollapsible>
			<SidebarCollapsibleTrigger title='کاربران'>
				<Profile2User variant='Broken' />
			</SidebarCollapsibleTrigger>
			<SidebarCollapsibleContent>
				<SidebarMenu isSubMenu>
					<SidebarMenuItem>
						<Link href={'/dashboard/users'} className='flex items-center gap-2.5 *:shrink-0'>
							<HambergerMenu className='size-5 stroke-content/60 ' variant='Broken' />
							<span>مشاهده همه کاربران</span>
						</Link>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarCollapsibleContent>
		</SidebarCollapsible>
	)
}
