'use client'
import { Skeleton } from '@/components/ui/skeleton'
import useQueries from '@/hooks/use-queries'
import { dataFetcher } from '@/lib/helpers'
import { TCategory } from '@/lib/types'
import { HashtagSquare } from 'iconsax-react'
import Link from 'next/link'
import useSWR from 'swr'
export default function ArticleCategories() {
	const { currentParams, pathname } = useQueries()
	const { data, error, isLoading } = useSWR<{ categories: TCategory[] }>(
		['/api/articles/categories', 'articles-categories'],
		dataFetcher,
	)

	if (isLoading) {
		return (
			<div className='border border-border rounded-lg py-10 px-5'>
				<div className='flex items-center gap-2'>
					<HashtagSquare className='size-10 fill-content' variant='Bulk' />
					<h3 className='text-2xl font-bold mt-2'>دسته بندی های مقالات</h3>
				</div>
				<div className='flex flex-wrap gap-2 mt-5'>
					{Array.from({ length: 5 }).map((_, index) => (
						<Skeleton key={index} className='h-8 w-28 bg-content/20 rounded-md' />
					))}
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex flex-col items-center justify-center gap-2'>
				<span className='text-xl font-bold'>مشکلی پیش آمده است</span>
				<span className='text-sm'>لطفا دوباره تلاش کنید</span>
			</div>
		)
	}

	if (!data || data.categories.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center gap-2'>
				<span className='text-xl font-bold'>دسته بندی ای وجود ندارد</span>
			</div>
		)
	}

	return (
		<div className='border border-border rounded-lg py-10 px-5'>
			<div className='flex items-center gap-2'>
				<HashtagSquare className='size-10 fill-content' variant='Bulk' />
				<h3 className='text-2xl font-bold mt-2'>دسته بندی های مقالات</h3>
			</div>
			<ul className='flex flex-wrap gap-2 mt-5'>
				{data.categories.map(cat => {
					delete currentParams.page
					const newParam = { category: cat.slug }
					return (
						<li key={cat.id} className='bg-content/20 pt-1 pb-0.5 px-2.5 rounded-lg cursor-pointer'>
							<Link href={{ pathname, query: { ...currentParams, ...newParam } }}>#{cat.name}</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
