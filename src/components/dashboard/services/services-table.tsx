'use client'

import { TServices } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { ServicesColumns } from './services-columns'
import ServicesDataTable from './services-data-table'

async function fetcher(url: string): Promise<{ services: TServices[] }> {
	const response = await axios.get(url)
	return await response.data
}
export default function ServicesTable() {
	const { data, isLoading } = useSWR('/api/dashboard/users', fetcher)

	if (isLoading || !data) return <p>loading</p>

	return (
		<div className='rounded-md border max-w-full overflow-hidden bg-accent p-5'>
			<ServicesDataTable data={data.services} columns={ServicesColumns} />
		</div>
	)
}
