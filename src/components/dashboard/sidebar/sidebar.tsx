import { Category } from 'iconsax-react'
import Link from 'next/link'
import DashboardSidebarArticles from './sidebar-articles'
import DashboardSidebarComments from './sidebar-comments'
import DashboardSidebarFooter from './sidebar-footer'
import DashboardSidebarHeader from './sidebar-header'
import DashboardSidebarMenu from './sidebar-menu'
import DashboardSidebarMenuItem from './sidebar-menu-item'
import DashboardSidebarMenus from './sidebar-menus'
import DashboardSidebarProvider from './sidebar-provider'
import DashboardSidebarSeperator from './sidebar-seperator'
import DashboardSidebarServices from './sidebar-services'
import DashboardSidebarUsers from './sidebar-users'
import DashboardSidebarWrapper from './sidebar-wrapper'

export default function DashboardSidebar() {
	return (
		<DashboardSidebarProvider>
			<DashboardSidebarWrapper>
				<DashboardSidebarHeader />
				<DashboardSidebarSeperator />
				<div className='flex-1 overflow-y-auto overflow-x-hidden'>
					<DashboardSidebarMenu>
						<DashboardSidebarMenuItem>
							<Link href='/dashboard' className='flex items-center flex-1 gap-2 group *:shrink-0 '>
								<Category
									className='h-8.5 stroke-content transform group-hover:scale-110 transition-transform duration:200 p-1 rounded-lg'
									variant='Broken'
								/>
								<p className='text-lg font-bold px-2.5 pb-1 pt-1.5 rounded-lg'>داشبرد</p>
							</Link>
						</DashboardSidebarMenuItem>
						<DashboardSidebarMenuItem>
							<DashboardSidebarArticles />
						</DashboardSidebarMenuItem>
						<DashboardSidebarMenuItem>
							<DashboardSidebarServices />
						</DashboardSidebarMenuItem>

						<DashboardSidebarMenuItem>
							<DashboardSidebarMenus />
						</DashboardSidebarMenuItem>
						<DashboardSidebarMenuItem>
							<DashboardSidebarUsers />
						</DashboardSidebarMenuItem>
						<DashboardSidebarMenuItem>
							<DashboardSidebarComments />
						</DashboardSidebarMenuItem>
					</DashboardSidebarMenu>
				</div>
				<DashboardSidebarSeperator />
				<DashboardSidebarFooter />
			</DashboardSidebarWrapper>
		</DashboardSidebarProvider>
	)
}
