import DashboardArticles from './dashboard-articles'
import DashboardChart from './dashboard-chart'
import DashboardComments from './dashboard-comments'
import DashboardStatistics from './dashboard-statistics'

export default function DashboardContent() {
	return (
		<div className='flex gap-5'>
			<div className='flex-1 flex flex-col gap-5'>
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
