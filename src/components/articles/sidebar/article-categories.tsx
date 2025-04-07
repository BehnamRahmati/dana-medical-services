'use client'
import { Skeleton } from '@/components/ui/skeleton'
import useQueries from '@/hooks/use-queries'
import { fetchCategory } from '@/lib/helpers'
import { HashtagSquare } from 'iconsax-react'
import Link from 'next/link'
import useSWR from 'swr'

export default function ArticleCategories() {
	const { currentParams, pathname } = useQueries()
	const { data: categories, isLoading } = useSWR('/api/dashboard/categories', fetchCategory)

	return (
		<div className='border border-border rounded-lg py-10 px-5'>
			<div className='flex items-center gap-2'>
				<HashtagSquare className='size-10 fill-content' variant='Bulk' />
				<h3 className='text-2xl font-bold mt-2'>دسته بندی های مقالات</h3>
			</div>
			<ul className='flex items-center flex-wrap mt-5 gap-2'>
				{isLoading || !categories ? (
					<>
						<Skeleton className='h-8 w-28 bg-content/20' />
						<Skeleton className='h-8 w-28 bg-content/20' />
						<Skeleton className='h-8 w-28 bg-content/20' />
						<Skeleton className='h-8 w-28 bg-content/20' />
						<Skeleton className='h-8 w-28 bg-content/20' />
					</>
				) : (
					categories.map(cat => {
						const newParam = { category: cat.slug }
						return (
							<li key={cat.id} className='bg-content/20 pt-1 pb-0.5 px-2.5 rounded-lg cursor-pointer'>
								<Link href={{ pathname, query: { ...currentParams, ...newParam } }}>#{cat.name}</Link>
							</li>
						)
					})
				)}
			</ul>
		</div>
	)
}
