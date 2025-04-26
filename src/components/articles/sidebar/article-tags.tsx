'use client'

import { Skeleton } from '@/components/ui/skeleton'
import useQueries from '@/hooks/use-queries'
import { dataFetcher } from '@/lib/helpers'
import { TTag } from '@/lib/types'
import { Tag2 } from 'iconsax-react'
import Link from 'next/link'
import useSWR from 'swr'

export default function ArticleTags() {
	const { currentParams, pathname } = useQueries()
	const { data, isLoading, error } = useSWR<{ tags: TTag[] }>(['/api/articles/tags', 'articles-tags'], dataFetcher)

	if (isLoading) {
		return (
			<div className='border border-border rounded-lg py-10 px-5'>
				<div className='flex items-center gap-2'>
					<Tag2 className='size-10 fill-content' variant='Bulk' />
					<h3 className='text-2xl font-bold mt-2'>برچسب های مقالات</h3>
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

	if (!data || data.tags.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center gap-2'>
				<span className='text-xl font-bold'>برچسبی وجود ندارد</span>
			</div>
		)
	}

	return (
		<div className='border border-border rounded-lg py-10 px-5'>
			<div className='flex items-center gap-2'>
				<Tag2 className='size-10 fill-content' variant='Bulk' />
				<h3 className='text-2xl font-bold mt-2'>برچسب های مقالات</h3>
			</div>
			<ul className='flex flex-wrap gap-2 mt-5'>
				{data.tags.map(tag => {
					delete currentParams.page
					const newParam = { tags: tag.slug }
					return (
						<li key={tag.id} className='bg-content/20 pt-1 pb-0.5 px-2.5 rounded-lg cursor-pointer'>
							<Link href={{ pathname, query: { ...currentParams, ...newParam } }}>#{tag.name}</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
