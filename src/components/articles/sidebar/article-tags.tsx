'use client'

import { Skeleton } from '@/components/ui/skeleton'
import useQueries from '@/hooks/use-queries'
import { fetchTags } from '@/lib/helpers'
import { Tag2 } from 'iconsax-react'
import Link from 'next/link'
import useSWR from 'swr'

export default function ArticleTags() {
	const { currentParams, pathname } = useQueries()
	const { data: tags, isLoading } = useSWR('/api/dashboard/tags', fetchTags)

	const renderTags = () => {
		return (
			<ul className='flex items-center flex-wrap mt-5 gap-2'>
				{isLoading || !tags ? (
					<>
						<Skeleton className='h-8 w-28 bg-content/20' />
						<Skeleton className='h-8 w-28 bg-content/20' />
						<Skeleton className='h-8 w-28 bg-content/20' />
						<Skeleton className='h-8 w-28 bg-content/20' />
						<Skeleton className='h-8 w-28 bg-content/20' />
					</>
				) : (
					tags.map(tag => {
						const newParam = { tags: tag.slug }
						return (
							<li key={tag.id} className='bg-content/20 pt-1 pb-0.5 px-2.5 rounded-lg cursor-pointer'>
								<Link href={{ pathname, query: { ...currentParams, ...newParam } }}>#{tag.name}</Link>
							</li>
						)
					})
				)}
			</ul>
		)
	}

	return (
		<div className='border border-border rounded-lg py-10 px-5'>
			<div className='flex items-center gap-2'>
				<Tag2 className='size-10 fill-content' variant='Bulk' />
				<h3 className='text-2xl font-bold mt-2'>تگ های مقالات</h3>
			</div>
			{renderTags()}
		</div>
	)
}
