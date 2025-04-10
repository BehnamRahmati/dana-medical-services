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

export default function DashboardSidebarServices() {
	return (
		<SidebarCollapsible>
			<SidebarCollapsibleTrigger title='خدمات'>
				<I3DSquare variant='Broken' />
			</SidebarCollapsibleTrigger>
			<SidebarCollapsibleContent>
				<SidebarMenu isSubMenu>
					<SidebarMenuItem>
						<Link href={'/dashboard/services'} className='flex items-center gap-2.5 *:shrink-0'>
							<HambergerMenu className='size-5 stroke-content/60 ' variant='Broken' />
							<span>مشاهده همه خدمات</span>
						</Link>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<Link href={'/dashboard/services/create'} className='flex items-center gap-2.5 *:shrink-0'>
							<AddSquare className='size-5 stroke-content/60' variant='Broken' />
							<span>نوشتن خدمت جدید</span>
						</Link>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<Link href={'/dashboard/services/categories'} className='flex items-center gap-2.5 *:shrink-0'>
							<HashtagSquare className='size-5 stroke-content/60' variant='Broken' />
							<span> دسته بندی های خدمات</span>
						</Link>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarCollapsibleContent>
		</SidebarCollapsible>
	)
}
