'use client'

import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { dataFetcher } from '@/lib/helpers'
import { TServiceItem } from '@/lib/types'
import useSWR from 'swr'
import ServiceItemsCreateForm from './create/service-items-create'
import { ServiceItemsColumns } from './service-item-columns'

export default function ServiceItemsTable() {
	const { data, isLoading, mutate, error } = useSWR<{ serviceItems: TServiceItem[] }>(
		['/api/dashboard/services/items', 'ds-items'],
		dataFetcher,
	)

	if (isLoading) return <DataTableSkeleton />
	if (error) return <p>خطا در بارگذاری دیتا</p>
	if (!data) return <p>هیچ دیتایی یافت نشد</p>

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
