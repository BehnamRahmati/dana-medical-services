'use client'

import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { dataFetcher } from '@/lib/helpers'
import { TUser } from '@/lib/types'
import useSWR from 'swr'
import { UserColumns } from './users-columns'

export default function UsersTable() {
	const { data, isLoading, mutate } = useSWR<{ users: TUser[] }>(['/api/dashboard/users', 'du-users'], dataFetcher)

	if (isLoading || !data) return <DataTableSkeleton />

	return (
		<div className='rounded-xl max-w-full overflow-hidden bg-accent p-2.5 lg:p-5 h-full flex flex-col'>
			<GenericDataTable filterColumn='name' data={data.users} columns={UserColumns} mutate={mutate} />
		</div>
	)
}
