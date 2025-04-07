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

export default function DashboardSidebarMenus() {
	return (
		<SidebarCollapsible>
			<SidebarCollapsibleTrigger title='منو ها'>
				<Fatrows variant='Broken' />
			</SidebarCollapsibleTrigger>
			<SidebarCollapsibleContent>
				<SidebarMenu isSubMenu>
					<SidebarMenuItem>
						<Link href={'/dashboard/menus'} className='flex items-center gap-2.5 *:shrink-0'>
							<HambergerMenu className='size-5 stroke-content/60 ' variant='Broken' />
							<span>مشاهده همه منو ها</span>
						</Link>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarCollapsibleContent>
		</SidebarCollapsible>
	)
}
