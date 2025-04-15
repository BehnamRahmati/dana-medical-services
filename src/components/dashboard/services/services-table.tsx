'use client'

import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { TService } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { ServicesColumns } from './services-columns'

async function fetcher(url: string): Promise<{ services: TService[] }> {
	const response = await axios.get(url)
	return await response.data
}

export default function ServicesTable() {
	const { data, isLoading, mutate } = useSWR('/api/dashboard/services', fetcher, {
		revalidateOnFocus: true,
		revalidateIfStale: true,
	})

	if (isLoading || !data) return <DataTableSkeleton />

	return (
		<div className='rounded-xl max-w-full overflow-hidden bg-accent h-full p-2.5 lg:p-5 flex flex-col'>
			<GenericDataTable data={data.services} mutate={mutate} columns={ServicesColumns} />
		</div>
	)
}
