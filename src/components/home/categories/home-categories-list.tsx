'use client'

import { fetchServicesCategories } from '@/lib/helpers'
import useSWR from 'swr'
import HomeCategoriesCard from './home-categories-card'
import HomeCategoriesFallback from './home-categories-fallback'

export default function HomeCategoriesList() {
	const { data: categories, isLoading } = useSWR('/api/dashboard/services/categories', fetchServicesCategories)
	if (isLoading || !categories) return <HomeCategoriesFallback />
	return (
		<div className='grid grid-cols-1 md:flex items-center justify-center gap-10 lg:gap-20 '>
			{categories && categories.map(cat => <HomeCategoriesCard category={cat} key={cat.id} />)}
		</div>
	)
}
