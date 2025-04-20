'use client'

import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { dataFetcher } from '@/lib/helpers'
import { TCategory } from '@/lib/types'
import useSWR from 'swr'
import { categoriesColumns } from './categories-column'
import CategroriesCreate from './categories-create'

export default function CategoriesTable() {
	const { data, isLoading, mutate, error } = useSWR<{ categories: TCategory[] }>(
		['/api/dashboard/articles/categories', 'dac-categories'],
		dataFetcher,
	)

	if (isLoading) return <DataTableSkeleton />
	if (error) return <p>خطا در بارگذاری دیتا</p>
	if (!data) return <p>دیتایی یافت نشد</p>

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
