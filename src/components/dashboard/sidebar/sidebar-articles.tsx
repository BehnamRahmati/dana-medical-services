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

export default function DashboardSidebarArticles() {
	return (
		<SidebarCollapsible>
			<SidebarCollapsibleTrigger title='مقالات'>
				<Cards variant='Broken' />
			</SidebarCollapsibleTrigger>
			<SidebarCollapsibleContent>
				<SidebarMenu isSubMenu>
					<SidebarMenuItem>
						<Link href={'/dashboard/articles'} className='flex items-center gap-2.5 *:shrink-0'>
							<HambergerMenu className='size-5 stroke-content/60 ' variant='Broken' />
							<span>مشاهده همه مقالات</span>
						</Link>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<Link href={'/dashboard/articles/create'} className='flex items-center gap-2.5 *:shrink-0'>
							<AddSquare className='size-5 stroke-content/60' variant='Broken' />
							<span>نوشتن مقاله جدید</span>
						</Link>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<Link href={'/dashboard/articles/categories'} className='flex items-center gap-2.5 *:shrink-0'>
							<HashtagSquare className='size-5 stroke-content/60' variant='Broken' />
							<span> دسته بندی های مقالات</span>
						</Link>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<Link href={'/dashboard/articles/tags'} className='flex items-center gap-2.5 *:shrink-0'>
							<Tag className='size-5 stroke-content/60' variant='Broken' />
							<span> تگ های مقالات</span>
						</Link>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarCollapsibleContent>
		</SidebarCollapsible>
	)
}
