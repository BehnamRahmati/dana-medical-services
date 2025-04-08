'use client'

import PostCard from '@/components/ui/post-card'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchArticles } from '@/lib/helpers'
import useSWR from 'swr'

export default function LandingArticles() {
	const { data: articles, isLoading } = useSWR('/api/articles/landing', fetchArticles)

	if (isLoading || !articles)
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-1/2 lg:absolute lg:-top-1/2 lg:left-10 '>
				<div className='grid grid-cols-1 gap-6'>
					{[...new Array(2)].map((_, i) => (
						<Skeleton key={'post' + i} className='h-[400] w-[370px] bg-content/30' />
					))}
				</div>
				<div className='grid grid-cols-1 gap-6 lg:transform lg:translate-y-10'>
					{[...new Array(2)].map((_, i) => (
						<Skeleton key={'pst' + i} className='h-[400] w-[370px] bg-content/30' />
					))}
				</div>
			</div>
		)

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-1/2 lg:absolute lg:-top-1/2 lg:left-10 '>
			<div className='grid grid-cols-1 gap-6'>
				{articles.slice(0, 2).map(article => (
					<PostCard article={article} key={article.id} />
				))}
			</div>
			<div className='grid grid-cols-1 gap-6 lg:transform lg:translate-y-10'>
				{articles.slice(2, 4).map(article => (
					<PostCard article={article} key={article.id} />
				))}
			</div>
		</div>
	)
}
