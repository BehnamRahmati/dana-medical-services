'use client'

import { dataFetcher } from '@/lib/helpers'
import { TCategory } from '@/lib/types'
import useSWR from 'swr'
import HomeCategoriesCard from './home-categories-card'
import HomeCategoriesFallback from './home-categories-fallback'

export default function HomeCategoriesList() {
	const { data, isLoading } = useSWR<{ categories: TCategory[] }>(
		['/api/dashboard/categories/landing', 'home-categories'],
		dataFetcher,
	)
	if (isLoading || !data) return <HomeCategoriesFallback />
	return (
		<div className='grid grid-cols-1 md:flex items-center justify-center gap-10 lg:gap-20 '>
			{data.categories.map(cat => (
				<HomeCategoriesCard category={cat} key={cat.id} />
			))}
		</div>
	)
}
