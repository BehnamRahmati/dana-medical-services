import DashboardHeader from '@/components/dashboard/dashboard-header'
import DashboardSidebar from '@/components/dashboard/sidebar/dashoard-sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	// * This is the main layout for the dashboard. It will be used to wrap all the pages in the dashboard.
	return (
		<div className='flex max-w-screen min-h-screen overflow-x-hidden'>
			<DashboardSidebar />
			<div className='flex-1 p-2.5 lg:p-5 overflow-x-hidden flex flex-col'>
				<DashboardHeader />
				<main className='flex-1'>{children}</main>
			</div>
		</div>
	)
}
