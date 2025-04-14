'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { fetchComments } from '@/lib/helpers'
import Image from 'next/image'
import useSWR from 'swr'
export default function DashboardComments() {
	const { data: comments, isLoading } = useSWR('/api/dashboard/comments', fetchComments)
	return (
		<div className='w-full rounded-lg bg-accent h-96 p-5'>
			<div className='mb-5'>
				<h3 className='font-semibold'>دیدگاه های اخیر</h3>
				<p className='text-muted-foreground text-xs'>دیدگاه های اخیر را می توانید در این بخش ببینید</p>
			</div>
			<ul className='flex flex-col gap-5'>
				{isLoading || !comments || !comments.length ? (
					<Skeleton className='h-20 bg-muted w-full' />
				) : (
					comments.slice(0, 4).map((comment, index) => (
						<li key={index} className='flex gap-2'>
							<div className='w-10 h-10 rounded-2xl bg-gray-100'>
								<Image
									src={comment.user.image}
									alt={comment.user.name}
									className='rounded-2xl'
									width={100}
									height={100}
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
					))
				)}
			</ul>
		</div>
	)
}
