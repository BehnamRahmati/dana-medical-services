'use client'

import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { dataFetcher } from '@/lib/helpers'
import { TRequest } from '@/lib/types'
import useSWR from 'swr'
import { RequestsColumns } from './requests-columns'

export default function RequestsTable() {
	const { data, isLoading, error, mutate } = useSWR<{ requests: TRequest[] }>(
		['/api/dashboard/requests', 'dr-requests'],
		dataFetcher,
	)

	if (isLoading) return <DataTableSkeleton />

	if (error) return <p>خطایی رخ داده است</p>

	if (!data) return <p>داده ای یافت نشد</p>

	return (
		<div className='rounded-xl  max-w-full overflow-hidden bg-accent p-2.5 lg:p-5 h-full flex flex-col'>
			<GenericDataTable filterColumn='name' data={data.requests} mutate={mutate} columns={RequestsColumns} />
		</div>
	)
}
