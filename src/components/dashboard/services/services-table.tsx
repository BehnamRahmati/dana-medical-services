'use client'

import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { dataFetcher } from '@/lib/helpers'
import { TService } from '@/lib/types'
import useSWR from 'swr'
import { ServicesColumns } from './services-columns'

export default function ServicesTable() {
	const { data, isLoading, mutate, error } = useSWR<{ services: TService[] }>(
		['/api/dashboard/services', 'ds-services'],
		dataFetcher,
	)

	if (isLoading) return <DataTableSkeleton />
	if (error) return <p>خطا در بارگذاری دیتا</p>
	if (!data) return <p>هیچ دیتایی یافت نشد</p>

	return (
		<div className='rounded-xl max-w-full overflow-hidden bg-accent h-full p-2.5 lg:p-5 flex flex-col'>
			<GenericDataTable data={data.services} mutate={mutate} columns={ServicesColumns} />
		</div>
	)
}
