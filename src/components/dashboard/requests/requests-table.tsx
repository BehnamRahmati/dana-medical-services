'use client'

import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { TRequest } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { RequestsColumns } from './requests-columns'

async function fetcher(url: string): Promise<{ requests: TRequest[] }> {
	const response = await axios.get(url)
	return await response.data
}
export default function RequestsTable() {
	const { data, isLoading, mutate } = useSWR('/api/dashboard/requests', fetcher)

	if (isLoading || !data) return <DataTableSkeleton />

	return (
		<div className='rounded-xl  max-w-full overflow-hidden bg-accent p-2.5 lg:p-5 h-full flex flex-col'>
			<GenericDataTable filterColumn='name' data={data.requests} mutate={mutate} columns={RequestsColumns} />
		</div>
	)
}
