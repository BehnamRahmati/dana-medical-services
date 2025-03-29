import DashboardHeader from '@/components/dashboard/dashboard-header'
import DashboardSidebar from '@/components/dashboard/sidebar/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	// * This is the main layout for the dashboard. It will be used to wrap all the pages in the dashboard.
	return (
		<div className='flex h-screen w-screen overflow-hidden'>
			<DashboardSidebar />
			<div className='flex-1 overflow-hidden p-5'>
				<DashboardHeader />
				<main>{children}</main>
			</div>
		</div>
	)
}
