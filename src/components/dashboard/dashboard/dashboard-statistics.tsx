'use client'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import { Chart21, DocumentText1, Heart, Profile2User } from 'iconsax-react'
import useSWR from 'swr'

async function staticFecher(url: string) {
	const response = await axios.get(url)
	return response.data.data
}
export default function DashboardStatistics() {
	const { data: staticsData, isLoading } = useSWR('/api/dashboard', staticFecher)

	if (isLoading || !staticsData) {
		return (
			<ul className='grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-5 w-full'>
				{[...new Array(4)].map((_, i) => (
					<Skeleton key={'skstat' + i} className='bg-content/10 h-24 w-full' />
				))}
			</ul>
		)
	}

	const statics = [
		{
			title: 'کاربر',
			value: staticsData.usersCount || 0,
			color: 'bg-primary/20',
			icon: <Profile2User className='stroke-primary size-12' variant='Broken' />,
		},
		{
			title: 'مقاله',
			value: staticsData.postsCount || 0,
			color: 'bg-amber-500/20',
			icon: <DocumentText1 className='stroke-amber-500 size-12' variant='Broken' />,
		},
		{
			title: 'لایک',
			value: staticsData.likesCount || 0,
			color: 'bg-red-500/20',
			icon: <Heart className='stroke-red-500 size-12' variant='Broken' />,
		},
		{
			title: 'بازدید',
			value: staticsData.viewsCount || 0,
			color: 'bg-secondary/20',
			icon: <Chart21 className='stroke-secondary size-12' variant='Broken' />,
		},
	]

	return (
		<ul className='grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-5 w-full'>
			{statics.map((staticItem, index) => {
				return (
					<li key={'strst' + index} className='bg-accent p-5 rounded-lg flex items-center gap-5 w-full'>
						<div className={`${staticItem.color} p-2 rounded-2xl`}>{staticItem.icon}</div>
						<div className=''>
							<div className='text-3xl font-bold'>{staticItem.value}</div>
							<div className='text-gray-500'>{staticItem.title}</div>
						</div>
					</li>
				)
			})}
		</ul>
	)
}
