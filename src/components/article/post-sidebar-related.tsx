'use client'
import { fetchArticles } from '@/lib/helpers'
import { Cards } from 'iconsax-react'
import useSWR from 'swr'
import { Skeleton } from '../ui/skeleton'
import PostSidebarRelatedCard from './post-sidebar-related-card'

export default function PostSidebarRelated() {
	const { data: articles, isLoading } = useSWR('/api/articles?tags=depression', fetchArticles)

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
					<h3 className='text-lg font-bold'>مقالات مرتبط</h3>
					<p className='text-xs'>شما میتوانید مقالات مرتبط با این مقاله را اینجا مشاهده کنید.</p>
				</div>
			</div>
			<ul className='flex flex-col mt-5 gap-2'>
				{articles.slice(0, 4).map(article => (
					<li key={'related' + article.id}>
						<PostSidebarRelatedCard slug={article.slug} title={article.title} />
					</li>
				))}
			</ul>
		</div>
	)
}
