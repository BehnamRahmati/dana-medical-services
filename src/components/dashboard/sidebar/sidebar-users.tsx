import { Profile2User } from 'iconsax-react'
import DashboardCollapsible from './sidebar-collapsible'
import DashboardSidebarCollapsibleContent from './sidebar-collapsible-content'
import DashboardSidebarCollapsibleTriger from './sidebar-collapsible-trigger'
import DashboardSidebarMenu from './sidebar-menu'
import DashboardSidebarMenuItem from './sidebar-menu-item'

export default function DashboardSidebarUsers() {
	return (
		<DashboardCollapsible>
			<DashboardSidebarCollapsibleTriger title='کاربران'>
				<Profile2User variant='Broken' />
			</DashboardSidebarCollapsibleTriger>
			<DashboardSidebarCollapsibleContent>
				<DashboardSidebarMenu isSubMenu>
					<DashboardSidebarMenuItem>نوشتن مقاله جدید</DashboardSidebarMenuItem>
					<DashboardSidebarMenuItem>نوشتن مقاله جدید</DashboardSidebarMenuItem>
					<DashboardSidebarMenuItem>نوشتن مقاله جدید</DashboardSidebarMenuItem>
					<DashboardSidebarMenuItem>نوشتن مقاله جدید</DashboardSidebarMenuItem>
				</DashboardSidebarMenu>
			</DashboardSidebarCollapsibleContent>
		</DashboardCollapsible>
	)
}
