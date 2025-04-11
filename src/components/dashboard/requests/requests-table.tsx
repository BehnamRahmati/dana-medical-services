'use client'

import { TRequest } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { RequestsColumns } from './requests-columns'
import CommentsDataTable from './requests-data-table'

async function fetcher(url: string): Promise<{ requests: TRequest[] }> {
	const response = await axios.get(url)
	return await response.data
}
export default function RequestsTable() {
	const { data, isLoading } = useSWR('/api/dashboard/requests', fetcher)

	if (isLoading || !data) return <p>loading</p>

	return (
		<div className='rounded-xl  max-w-full overflow-hidden bg-accent p-5 h-full flex flex-col'>
			<CommentsDataTable data={data.requests} columns={RequestsColumns} />
		</div>
	)
}
