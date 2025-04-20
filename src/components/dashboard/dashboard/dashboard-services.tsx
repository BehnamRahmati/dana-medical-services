'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { dataFetcher } from '@/lib/helpers'
import { TService } from '@/lib/types'
import useSWR from 'swr'
export default function DashboardServices() {
	const { data, isLoading, error } = useSWR<{ services: TService[] }>(
		['/api/dashboard/services/dashboard', 'd-services'],
		dataFetcher,
	)
	return (
		<div className='w-full rounded-lg bg-accent p-5'>
			<div className='mb-5'>
				<h3 className='font-semibold'> خدمات اخیر</h3>
				<p className='text-muted-foreground text-xs'> خدمات اخیر را می توانید در این بخش ببینید</p>
			</div>
			<ul className='flex flex-col gap-5'>
				{isLoading && (
					<li>
						<Skeleton className='h-20 bg-muted w-full' />
					</li>
				)}
				{error && <li>خطا در بارگذاری خدمات</li>}
				{!isLoading && !error && data && (
					<>
						{data.services.map((service, index) => (
							<li key={index} className='flex gap-2'>
								{service.title}
							</li>
						))}
					</>
				)}
			</ul>
		</div>
	)
}
