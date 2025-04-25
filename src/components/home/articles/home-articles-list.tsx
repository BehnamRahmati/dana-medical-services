'use client'

import PostCard from '@/components/ui/post-card'
import { dataFetcher } from '@/lib/helpers'
import { TArticle } from '@/lib/types'
import useSWR from 'swr'
import HomeArticlesFallback from './home-articles-fallback'

export default function HomeArticlesList() {
	const { data, isLoading } = useSWR<{ articles: TArticle[] }>(['/api/articles/landing', 'home-articles'], dataFetcher)
	if (isLoading || !data) return <HomeArticlesFallback />

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-1/2 lg:absolute lg:-top-1/3 2xl:-top-1/2 lg:left-10 '>
			<div className='grid grid-cols-1 gap-6'>
				{data.articles.slice(0, 2).map(article => (
					<PostCard article={article} key={article.id} />
				))}
			</div>
			<div className='grid grid-cols-1 gap-6 lg:transform lg:translate-y-10'>
				{data.articles.slice(2, 4).map(article => (
					<PostCard article={article} key={article.id} />
				))}
			</div>
		</div>
	)
}
