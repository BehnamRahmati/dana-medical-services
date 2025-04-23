'use client'
import { dataFetcher } from '@/lib/helpers'
import { TUser } from '@/lib/types'
import useSWR from 'swr'
import { Skeleton } from '../ui/skeleton'
import { H3 } from '../ui/typography'
import ExpertsCard from './experts-card'

export default function ExpertsList() {
	const { data, isLoading, error } = useSWR<{ users: TUser[] }>(['/api/users', 'experts-users'], dataFetcher)

	if (isLoading)
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
				<ExpertsListSkeleton />
				<ExpertsListSkeleton />
				<ExpertsListSkeleton />
			</div>
		)
	if (error) return <p>خطا در بارگذاری دیتا</p>
	if (!data) return <p>هیچ دیتایی یافت نشد</p>
	return (
		<div>
			<H3>لیست متخصصان دنا</H3>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-16 mt-10'>
				{data.users.map(user => (
					<ExpertsCard key={user.id} user={user} />
				))}
			</div>
		</div>
	)
}

function ExpertsListSkeleton() {
	return (
		<div className='w-full bg-content/10 rounded-xl p-5 flex flex-col items-center'>
			<Skeleton className='bg-content/10 size-28 rounded-full mb-5' />
			<Skeleton className='bg-content/10 h-8 w-44 mb-5' />
			<Skeleton className='bg-content/10 h-44 w-2/3 mb-5' />
		</div>
	)
}
