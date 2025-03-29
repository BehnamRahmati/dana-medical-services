import { Cards, HambergerMenu, PenAdd } from 'iconsax-react'
import Link from 'next/link'
import DashboardCollapsible from './sidebar-collapsible'
import DashboardSidebarCollapsibleContent from './sidebar-collapsible-content'
import DashboardSidebarCollapsibleTriger from './sidebar-collapsible-trigger'
import DashboardSidebarMenu from './sidebar-menu'
import DashboardSidebarMenuItem from './sidebar-menu-item'

export default function DashboardSidebarArticles() {
	return (
		<DashboardCollapsible>
			<DashboardSidebarCollapsibleTriger title='مقالات'>
				<Cards variant='Broken' />
			</DashboardSidebarCollapsibleTriger>
			<DashboardSidebarCollapsibleContent>
				<DashboardSidebarMenu isSubMenu>
					<DashboardSidebarMenuItem>
						<Link href={'/dashboard/articles'} className='flex items-center gap-2'>
							<HambergerMenu className='size-5 stroke-content' />
							<span>مشاهده همه مقالات</span>
						</Link>
					</DashboardSidebarMenuItem>
					<DashboardSidebarMenuItem>
						<Link href={'/dashboard/articles/create'} className='flex items-center gap-2'>
							<PenAdd className='size-5 stroke-content' />
							<span>نوشتن مقاله جدید</span>
						</Link>
					</DashboardSidebarMenuItem>
				</DashboardSidebarMenu>
			</DashboardSidebarCollapsibleContent>
		</DashboardCollapsible>
	)
}
