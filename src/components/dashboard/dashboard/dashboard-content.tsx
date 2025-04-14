import DashboardArticles from './dashboard-articles'
import DashboardChart from './dashboard-chart'
import DashboardComments from './dashboard-comments'
import DashboardStatistics from './dashboard-statistics'

export default function DashboardContent() {
	return (
		<div className='flex flex-col lg:flex-row gap-2.5 lg:gap-5'>
			<div className='flex-1 flex flex-col gap-2.5 lg:gap-5'>
				<DashboardStatistics />
				<DashboardChart />
				<DashboardArticles />
			</div>
			<div className='w-full lg:w-80'>
				<DashboardComments />
			</div>
		</div>
	)
}
