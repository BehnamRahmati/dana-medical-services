'use client'

import useArticles from '@/hooks/use-articles'
import PaginationCustom from '../ui/pagination-custom'
import PostCard from '../ui/post-card'
import { Skeleton } from '../ui/skeleton'

export default function ArticlesMainContent() {
	const { data, isLoading, error } = useArticles()

	console.warn('data', data)
	if (isLoading) {
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
				{Array.from({ length: 6 }).map((_, index) => (
					<Skeleton key={index} className='h-[350px] w-full bg-content/10 rounded-md' /> // Added rounded-md for consistency
				))}
			</div>
		)
	}
	if (error) {
		return (
			<div className='text-center text-destructive p-10 border border-destructive/50 rounded-md'>
				خطا در بارگذاری مقالات. لطفا دوباره تلاش کنید.
			</div>
		)
	}

	if (!data || data.articles.length === 0) {
		return (
			<div className='col-span-1 md:col-span-2 lg:col-span-3 text-center border-4 border-dashed border-border p-10 rounded-md'>
				هیچ مقاله‌ای یافت نشد.
			</div>
		)
	}
	return (
		<div className=''>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
				{data.articles.map(article => (
					<PostCard article={article} key={article.id} />
				))}
			</div>
			{data.pagination.totalPages > 1 && (
				<PaginationCustom totalPages={data.pagination.totalPages} currentPage={data.pagination.currentPage} />
			)}
		</div>
	)
}
