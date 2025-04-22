import DashboardArticles from './dashboard-articles'
import DashboardChart from './dashboard-chart'
import DashboardComments from './dashboard-comments'
import DashboardServices from './dashboard-services'
import DashboardStatistics from './dashboard-statistics'

export default function DashboardContent() {
	return (
		<div className='flex flex-col lg:flex-row gap-2.5 lg:gap-5 lg:h-full'>
			<div className='flex flex-col gap-2.5 lg:gap-5 lg:flex-1'>
				<DashboardStatistics />
				<div className='flex flex-col md:flex-row gap-5 lg:flex-1 '>
					<DashboardChart />
					<DashboardArticles />
				</div>
			</div>
			<div className='w-full lg:w-80 flex flex-col gap-5'>
				<DashboardComments />
				<DashboardServices />
			</div>
		</div>
	)
}
