'use client'

import { TCategory } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { ServicescategoriesColumns } from './categories-column'
import CategoriesDataTable from './categories-data-table'

async function fetcher(url: string): Promise<{ categories: TCategory[] }> {
	const response = await axios.get(url)
	return await response.data
}

export default function ServicesCategoriesTable() {
	const { data, isLoading } = useSWR('/api/dashboard/services/categories', fetcher)

	if (isLoading || !data) return <p>loading</p>

	return <CategoriesDataTable columns={ServicescategoriesColumns} data={data.categories} />
}
