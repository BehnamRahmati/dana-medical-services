'use client'

import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { dataFetcher } from '@/lib/helpers'
import { TCategory } from '@/lib/types'
import useSWR from 'swr'
import { categoriesColumns } from './categories-column'
import CategroriesCreate from './categories-create'

export default function CategoriesTable() {
	const { data, isLoading, mutate } = useSWR<{ categories: TCategory[] }>(
		['/api/dashboard/articles/categories', 'articles-categories'],
		dataFetcher,
	)

	if (isLoading || !data) return <DataTableSkeleton />

	return (
		<div className='flex flex-col rounded-xl bg-accent p-2.5 lg:p-5 h-full'>
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
