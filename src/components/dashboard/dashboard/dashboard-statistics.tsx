import { Chart21, DocumentText1, Heart, Profile2User } from 'iconsax-react'

export default function DashboardStatistics() {
	const statics = [
		{
			title: 'کاربر',
			value: 150,
			color: 'bg-primary/20',
			icon: <Profile2User className='stroke-primary size-12' variant='Broken' />,
		},
		{
			title: 'مقاله',
			value: 150,
			color: 'bg-amber-500/20',
			icon: <DocumentText1 className='stroke-amber-500 size-12' variant='Broken' />,
		},
		{
			title: 'لایک',
			value: 150,
			color: 'bg-red-500/20',
			icon: <Heart className='stroke-red-500 size-12' variant='Broken' />,
		},
		{
			title: 'بازدید',
			value: 150,
			color: 'bg-secondary/20',
			icon: <Chart21 className='stroke-secondary size-12' variant='Broken' />,
		},
	]

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
			{statics.map((staticItem, index) => {
				return (
					<div key={'strst' + index} className='bg-white p-5 rounded-lg flex items-center gap-5'>
						<div className={`${staticItem.color} p-2 rounded-2xl`}>{staticItem.icon}</div>
						<div className=''>
							<div className='text-3xl font-bold'>{staticItem.value}</div>
							<div className='text-gray-500'>{staticItem.title}</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}
