import { I3DSquare } from 'iconsax-react'
import DashboardCollapsible from './sidebar-collapsible'
import DashboardSidebarCollapsibleContent from './sidebar-collapsible-content'
import DashboardSidebarCollapsibleTriger from './sidebar-collapsible-trigger'
import DashboardSidebarMenu from './sidebar-menu'
import DashboardSidebarMenuItem from './sidebar-menu-item'

export default function DashboardSidebarServices() {
	return (
		<DashboardCollapsible>
			<DashboardSidebarCollapsibleTriger title='خدمات'>
				<I3DSquare variant='Broken' />
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
