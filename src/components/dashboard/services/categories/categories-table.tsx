'use client'

import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { TCategory } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { ServicescategoriesColumns } from './categories-column'
import ServicesCategroriesCreate from './categories-create'

async function fetcher(url: string): Promise<{ categories: TCategory[] }> {
	const response = await axios.get(url)
	return await response.data
}

export default function ServicesCategoriesTable() {
	const { data, isLoading, mutate } = useSWR('/api/dashboard/services/categories', fetcher)

	if (isLoading || !data) return <DataTableSkeleton />

	return (
		<div className='bg-accent p-2.5 lg:p-5 rounded-xl h-full flex flex-col'>
			<GenericDataTable
				data={data.categories}
				mutate={mutate}
				columns={ServicescategoriesColumns}
				filterColumn='name'
				createFormComponent={<ServicesCategroriesCreate mutate={mutate} />}
			/>
		</div>
	)
}
