'use client'

import PostCard from '@/components/ui/post-card'
import { fetchArticles } from '@/lib/helpers'
import useSWR from 'swr'
import HomeArticlesFallback from './home-articles-fallback'

export default function HomeArticlesList() {
	const { data: articles, isLoading } = useSWR('/api/articles/landing', fetchArticles)
	if (isLoading || !articles) return <HomeArticlesFallback />

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
