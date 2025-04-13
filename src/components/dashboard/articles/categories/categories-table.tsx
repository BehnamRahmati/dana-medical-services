'use client'

import { TCategory } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { categoriesColumns } from './categories-column'
import CategoriesDataTable from './categories-data-table'

async function fetcher(url: string): Promise<{ categories: TCategory[] }> {
	const response = await axios.get(url)
	return await response.data
}

export default function CategoriesTable() {
	const { data, isLoading } = useSWR('/api/dashboard/articles/categories', fetcher)

	if (isLoading || !data) return <p>loading</p>

	return <CategoriesDataTable columns={categoriesColumns} data={data.categories} />
}
