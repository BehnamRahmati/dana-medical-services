'use client'

import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { dataFetcher } from '@/lib/helpers'
import { TCategory } from '@/lib/types'
import useSWR from 'swr'
import { ServicescategoriesColumns } from './categories-column'
import ServicesCategroriesCreate from './categories-create'

export default function ServicesCategoriesTable() {
	const { data, isLoading, mutate } = useSWR<{ categories: TCategory[] }>(
		['/api/dashboard/services/categories', 'services-categories'],
		dataFetcher,
	)

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
