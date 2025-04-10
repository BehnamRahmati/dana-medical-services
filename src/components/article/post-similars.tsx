'use client'

import { fetchArticles } from '@/lib/helpers'
import { TArticles } from '@/lib/types'
import useSWR from 'swr'
import PostCard from '../ui/post-card'
import { Skeleton } from '../ui/skeleton'

function filterArticles(data: TArticles[], articleId: string) {
	return data.filter(x => x.id !== articleId)
}

export default function PostSimilars({ categorySlug, articleId }: { categorySlug: string; articleId: string }) {
	const { data, isLoading } = useSWR(`/api/articles?category=${categorySlug}`, fetchArticles)

	if (isLoading || !data)
		return (
			<div className='mt-10'>
				<Skeleton className='w-64 h-16 rounded-xl mb-5' />
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
					<Skeleton className='w-full h-[400px] rounded-xl' />
					<Skeleton className='w-full h-[400px] rounded-xl' />
					<Skeleton className='w-full h-[400px] rounded-xl' />
				</div>
			</div>
		)

	const articles = filterArticles(data, articleId)

	if (articles.length === 0) return <></>

	return (
		<div className='mt-10'>
			<div className='text-5xl font-extrabold'>پست های مشابه</div>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-5 xl:gap-10 mt-5'>
				{articles.slice(0, 2).map(article => (
					<PostCard article={article} key={article.id} />
				))}
			</div>
		</div>
	)
}
