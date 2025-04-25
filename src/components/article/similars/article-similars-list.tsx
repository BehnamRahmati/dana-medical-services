'use client'

import { dataFetcher } from '@/lib/helpers'
import { TArticle } from '@/lib/types'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import PostCard from '../../ui/post-card'
import ArticleSimilarsFallback from './article-similars-fallback'

export default function ArticleSimilarsList({ categorySlug }: { categorySlug: string }) {
	const slug = useParams()?.slug
	const { data, isLoading, error } = useSWR<{ articles: TArticle[] }>(
		slug ? [`/api/articles/${slug}/similars?category=${categorySlug}`, 'similar-articles'] : null,
		dataFetcher,
	)

	if (isLoading) return <ArticleSimilarsFallback />

	if (!data)
		return <p className='text-center border-4 border-dashed border-border p-5 lg:p-10 w-full mt-5'> هیچ دیتایی یافت نشد. </p>

	if (error)
		return <p className='text-center border-4 border-dashed border-border p-5 lg:p-10 w-full mt-5'>مشکلی پیش آمده است</p>

	if (data.articles.length === 0)
		return (
			<p className='text-center border-4 border-dashed border-border p-5 lg:p-10 w-full mt-5'>
				هیچ مقاله مشابه ای یافت نشد
			</p>
		)

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-5 2xl:gap-10 mt-5'>
			{data.articles.map(article => (
				<PostCard article={article} key={'similars' + article.id} />
			))}
		</div>
	)
}
