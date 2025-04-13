'use client'
import { fetchArticles } from '@/lib/helpers'
import { ArrowLeft3, Cards } from 'iconsax-react'
import Link from 'next/link'
import useSWR from 'swr'
import { Skeleton } from '../ui/skeleton'
import PostSidebarLatestCard from './post-sidebar-latest-card'

export default function PostSidebarLatest() {
	const { data: articles, isLoading } = useSWR('/api/articles/landing', fetchArticles)

	if (isLoading || !articles)
		return (
			<div className='flex flex-col gap-5 mb-5'>
				<Skeleton className='h-14 w-full' />
				<Skeleton className='h-14 w-full' />
				<Skeleton className='h-14 w-full' />
				<Skeleton className='h-14 w-full' />
			</div>
		)
	return (
		<div className='border border-border rounded-xl p-5 mb-5'>
			<div className='flex gap-2'>
				<Cards className='fill-content size-5' variant='Bulk' />
				<div className=''>
					<h3 className='text-lg font-bold'>4 مقاله اخیر</h3>
					<p className='text-xs'>شما میتوانید 5 مقاله اخیر را اینجا مشاهده کنید.</p>
				</div>
			</div>
			<ul className='flex flex-col mt-5 gap-2'>
				{articles.map(article => (
					<li key={'ltst' + article.id}>
						<PostSidebarLatestCard article={article} />
					</li>
				))}
			</ul>

			<Link
				href='/articles'
				className='block mx-auto w-fit border border-primary rounded-lg mt-10 py-2.5 px-5 text-primary'
			>
				<span>مشاهده مقالات</span>
				<ArrowLeft3 className='size-6 fill-primary inline-block mr-2' variant='Bulk' />
			</Link>
		</div>
	)
}
