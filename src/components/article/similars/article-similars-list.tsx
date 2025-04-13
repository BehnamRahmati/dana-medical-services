'use client'

import { fetchArticles } from '@/lib/helpers'
import { TArticles } from '@/lib/types'
import useSWR from 'swr'
import PostCard from '../../ui/post-card'
import ArticleSimilarsFallback from './article-similars-fallback'

function filterArticles(data: TArticles[], articleId: string) {
	return data.filter(x => x.id !== articleId)
}

export default function ArticleSimilarsList({ categorySlug, articleId }: { categorySlug: string; articleId: string }) {
	const { data, isLoading } = useSWR(`/api/articles?category=${categorySlug}`, fetchArticles)

	if (isLoading || !data) return <ArticleSimilarsFallback />

	const articles = filterArticles(data, articleId)

	if (articles.length === 0)
		return (
			<p className='text-center border-4 border-dashed border-border p-5 lg:p-10 w-full mt-5'>
				هیچ مقاله مشابه ای یافت نشد
			</p>
		)

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-5 xl:gap-10 mt-5'>
			{articles.slice(0, 2).map(article => (
				<PostCard article={article} key={'similars' + article.id} />
			))}
		</div>
	)
}
