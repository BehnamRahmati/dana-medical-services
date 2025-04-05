'use client'
import {
	SidebarCollapsible,
	SidebarCollapsibleContent,
	SidebarCollapsibleTrigger,
	SidebarMenu,
	SidebarMenuItem,
} from '@/components/ui/sidebar-custom'
import { HambergerMenu, Messages1 } from 'iconsax-react'
import Link from 'next/link'

export default function DashboardSidebarComments() {
	return (
		<SidebarCollapsible>
			<SidebarCollapsibleTrigger title='دیدگاه ها'>
				<Messages1 variant='Broken' />
			</SidebarCollapsibleTrigger>
			<SidebarCollapsibleContent>
				<SidebarMenu isSubMenu>
					<SidebarMenuItem>
						<Link href={'/dashboard/comments'} className='flex items-center gap-2.5 *:shrink-0'>
							<HambergerMenu className='size-5 stroke-content/60 ' variant='Broken' />
							<span>مشاهده همه دیدگاه ها</span>
						</Link>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarCollapsibleContent>
		</SidebarCollapsible>
	)
}
