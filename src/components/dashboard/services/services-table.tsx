'use client'

import { TService } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { ServicesColumns } from './services-columns'
import ServicesDataTable from './services-data-table'

async function fetcher(url: string): Promise<{ services: TService[] }> {
	const response = await axios.get(url)
	return await response.data
}

export default function ServicesTable() {
	const { data, isLoading } = useSWR('/api/dashboard/services', fetcher, {
		revalidateOnFocus: true,
		revalidateIfStale: true,
	})

	if (isLoading || !data) return <p>loading</p>

	return (
		<div className='rounded-xl max-w-full overflow-hidden bg-accent h-full p-5 flex flex-col'>
			<ServicesDataTable data={data.services} columns={ServicesColumns} />
		</div>
	)
}
