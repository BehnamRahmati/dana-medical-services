'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { dataFetcher } from '@/lib/helpers'
import { Chart21, DocumentText1, Heart, MessageText1, Profile2User } from 'iconsax-react'
import useSWR from 'swr'

type TData = {
	usersCount: number
	postsCount: number
	commentsCount: number
	likesCount: number
	viewsCount: number
}
export default function DashboardStatistics() {
	const { data, isLoading, error } = useSWR<{ data: TData }>(['/api/dashboard', 's-statics'], dataFetcher)

	if (isLoading) {
		return (
			<ul className='grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-5 w-full'>
				{[...new Array(4)].map((_, i) => (
					<Skeleton key={'skstat' + i} className='bg-content/10 h-24 w-full' />
				))}
			</ul>
		)
	}

	if (error) {
		return (
			<ul className='grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-5 w-full'>
				<li className='bg-accent p-5 rounded-lg flex items-center gap-5 w-full'>خطا در بارگذاری آمار</li>
			</ul>
		)
	}

	const statics = [
		{
			title: 'کاربر',
			value: data?.data.usersCount || 0,
			color: 'bg-sky-500/20',
			icon: <Profile2User className='stroke-sky-500 size-12' variant='Broken' />,
		},
		{
			title: 'مقاله',
			value: data?.data.postsCount || 0,
			color: 'bg-amber-500/20',
			icon: <DocumentText1 className='stroke-amber-500 size-12' variant='Broken' />,
		},
		{
			title: 'دیدگاه',
			value: data?.data.commentsCount || 0,
			color: 'bg-primary/20',
			icon: <MessageText1 className='stroke-primary size-12' variant='Broken' />,
		},
		{
			title: 'لایک',
			value: data?.data.likesCount || 0,
			color: 'bg-red-500/20',
			icon: <Heart className='stroke-red-500 size-12' variant='Broken' />,
		},
		{
			title: 'بازدید',
			value: data?.data.viewsCount || 0,
			color: 'bg-secondary/20',
			icon: <Chart21 className='stroke-secondary size-12' variant='Broken' />,
		},
	]

	return (
		<ul className='grid grid-cols-2 lg:grid-cols-5 gap-2.5 lg:gap-5 w-full'>
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
