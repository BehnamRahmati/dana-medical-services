'use client'

import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { TCategory } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { categoriesColumns } from './categories-column'
import CategroriesCreate from './categories-create'

async function fetcher(url: string): Promise<{ categories: TCategory[] }> {
	const response = await axios.get(url)
	return await response.data
}

export default function CategoriesTable() {
	const { data, isLoading, mutate } = useSWR('/api/dashboard/articles/categories', fetcher)

	if (isLoading || !data) return <DataTableSkeleton />

	return (
		<div className='flex flex-col rounded-xl bg-accent p-2.5 lg:p-5'>
			<GenericDataTable
				columns={categoriesColumns}
				mutate={mutate}
				filterColumn='name'
				data={data.categories}
				createFormComponent={<CategroriesCreate mutate={mutate} />}
			/>
		</div>
	)
}
