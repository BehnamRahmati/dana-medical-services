'use client'

import useArticles from '@/hooks/use-articles'
import PostCard from '../ui/post-card'
import { Skeleton } from '../ui/skeleton'

export default function ArticlesMainContent() {
	const { data: articles, isLoading } = useArticles()

	if (isLoading || !articles) {
		return (
			<div className='grid grid-cols-3 gap-5'>
				<Skeleton className='h-[350] w-full bg-content/30' />
				<Skeleton className='h-[350] w-full bg-content/30' />
				<Skeleton className='h-[350] w-full bg-content/30' />
				<Skeleton className='h-[350] w-full bg-content/30' />
				<Skeleton className='h-[350] w-full bg-content/30' />
				<Skeleton className='h-[350] w-full bg-content/30' />
			</div>
		)
	}
	return (
		<div className='grid grid-cols-3 gap-5'>
			{articles.length !== 0 ? (
				articles.map(article => <PostCard article={article} key={article.id} />)
			) : (
				<div className=''>هیچ داده ای یافت نشد</div>
			)}
		</div>
	)
}
