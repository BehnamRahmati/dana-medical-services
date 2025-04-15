'use client'

import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { TUser } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { UserColumns } from './users-columns'

async function fetcher(url: string): Promise<{ users: TUser[] }> {
	const response = await axios.get(url)
	return await response.data
}
export default function UsersTable() {
	const { data, isLoading, mutate } = useSWR('/api/dashboard/users', fetcher)

	if (isLoading || !data) return <DataTableSkeleton />

	return (
		<div className='rounded-xl max-w-full overflow-hidden bg-accent p-2.5 lg:p-5 h-full flex flex-col'>
			<GenericDataTable filterColumn='name' data={data.users} columns={UserColumns} mutate={mutate} />
		</div>
	)
}
