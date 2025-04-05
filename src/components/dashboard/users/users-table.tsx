'use client'

import { TUser } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { UserColumns } from './users-columns'
import UsersDataTable from './users-data-table'

async function fetcher(url: string): Promise<{ users: TUser[] }> {
	const response = await axios.get(url)
	return await response.data
}
export default function UsersTable() {
	const { data, isLoading } = useSWR('/api/dashboard/users', fetcher)

	if (isLoading || !data) return <p>loading</p>

	return (
		<div className='rounded-md border max-w-full overflow-hidden bg-accent p-5'>
			<UsersDataTable data={data.users} columns={UserColumns} />
		</div>
	)
}
