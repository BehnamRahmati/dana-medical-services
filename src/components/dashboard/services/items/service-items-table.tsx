'use client'

import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { TServiceItem } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import ServiceItemsCreateForm from './create/service-items-create'
import { ServiceItemsColumns } from './service-item-columns'

async function fetcher(url: string): Promise<{ serviceItems: TServiceItem[] }> {
	const response = await axios.get(url)
	return await response.data
}

export default function ServiceItemsTable() {
	const { data, isLoading, mutate } = useSWR('/api/dashboard/services/items', fetcher, {
		revalidateOnFocus: true,
		revalidateIfStale: true,
	})

	if (isLoading || !data) return <DataTableSkeleton />

	return (
		<div className='rounded-xl max-w-full overflow-hidden bg-accent h-full p-5 flex flex-col flex-1'>
			<GenericDataTable
				data={data.serviceItems}
				mutate={mutate}
				columns={ServiceItemsColumns}
				createFormComponent={<ServiceItemsCreateForm mutate={mutate} />}
			/>
		</div>
	)
}
