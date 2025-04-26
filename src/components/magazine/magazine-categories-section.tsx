'use client'
import { dataFetcher } from '@/lib/helpers'
import { TCategory } from '@/lib/types'
import { Category2 } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { Skeleton } from '../ui/skeleton'

export default function MagazineCategoriseSection() {
	const { data, isLoading, error } = useSWR<{ categories: TCategory[] }>(
		['/api/articles/categories', 'magazine-categories'],
		dataFetcher,
	)

	if (isLoading)
		return (
			<div className='container mx-auto px-2.5 lg:px-5 py-5 lg:py-10 2xl:pb-15 2xl:pt-30'>
				<div className='grid grid-cols-2 md:grid-cols-4 place-content-center lg:flex flex-col md:flex-row items-center md:items-start justify-center gap-10 '>
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className='flex flex-col items-center justify-center gap-2 '>
							<Skeleton className='bg-content/10 size-20 rounded-full' />
							<Skeleton className='bg-content/10 h-7 w-32' />
						</div>
					))}
				</div>
			</div>
		)
	if (error) return <p>خطا در بارگذاری مقالات</p>
	if (!data) return <p>مقالات یافت نشد</p>

	return (
		<div className='container mx-auto px-2.5 lg:px-5 py-5 lg:py-10 2xl:pb-15 2xl:pt-30'>
			<div className='grid grid-cols-2 md:grid-cols-4 place-content-center lg:flex flex-col md:flex-row items-center md:items-start justify-center gap-10 '>
				{data.categories.map(category => (
					<Link
						href={`/articles?category=${category.slug}`}
						key={category.id}
						className='flex flex-col items-center justify-center gap-2 group'
					>
						<div className='size-20 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-secondary/20'>
							{category.image ? (
								<Image src={category.image} alt={category.name} className='size-20' />
							) : (
								<Category2 className='size-12 stroke-primary group-hover:stroke-secondary' variant='Broken' />
							)}
						</div>
						<div className='text-center'>
							<p className='text-primary group-hover:text-secondary text-3xl font-bold'>{category.name}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
