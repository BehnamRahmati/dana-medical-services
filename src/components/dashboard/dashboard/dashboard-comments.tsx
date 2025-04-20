'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { dataFetcher } from '@/lib/helpers'
import { TComment } from '@/lib/types'
import Image from 'next/image'
import useSWR from 'swr'
export default function DashboardComments() {
	const { data, isLoading, error } = useSWR<{ comments: TComment[] }>(
		['/api/dashboard/comments/dashboard', 'd-comments'],
		dataFetcher,
	)

	const renderSkeletons = (count: number) => {
		return Array.from({ length: count }).map((_, index) => (
			<li key={`dcs-${index}`} className='flex gap-2 items-center'>
				<Skeleton className='w-10 h-10 rounded-2xl bg-muted' />
				<div className='flex flex-col gap-1 w-full'>
					<Skeleton className='h-4 w-1/2 bg-muted' />
					<Skeleton className='h-3 w-full bg-muted' />
					<Skeleton className='h-3 w-3/4 bg-muted' />
				</div>
			</li>
		))
	}

	return (
		<div className='w-full rounded-lg bg-accent p-5'>
			<div className='mb-5'>
				<h3 className='font-semibold'>دیدگاه های اخیر</h3>
				<p className='text-muted-foreground text-xs'>دیدگاه های اخیر را می توانید در این بخش ببینید</p>
			</div>
			<ul className='flex flex-col gap-5'>
				{isLoading && renderSkeletons(4)}
				{error && <li className='text-red-500 text-sm'>خطا در بارگذاری دیدگاه ها</li>}
				{!isLoading && !error && data && (
					<>
						{data.comments.map((comment, index) => (
							<li key={index} className='flex gap-2'>
								<div className='w-10 h-10 rounded-2xl bg-gray-100'>
									<Image
										src={comment.user.image}
										alt={comment.user.name}
										className='rounded-2xl'
										width={100}
										height={100}
										loading='lazy'
									/>
								</div>
								<div className='flex flex-col'>
									<div className='*:inline-block'>
										<span className='font-semibold'>{comment.user.name}</span>
										<span className='text-muted-foreground text-xs mr-2'>یک دیدگاه نوشته :</span>
									</div>
									<p className='line-clamp-2 text-sm'>{comment.content}</p>
								</div>
							</li>
						))}
					</>
				)}
			</ul>
		</div>
	)
}
