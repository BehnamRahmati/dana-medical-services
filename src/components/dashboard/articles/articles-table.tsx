'use client'

import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { TArticle } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { articleColumns } from './articles-column'

async function fetcher([url]: string[]): Promise<{ articles: TArticle[] }> {
	const response = await axios.get(url)
	return await response.data
}

export default function ArticlesTable() {
	const { data, isLoading, mutate } = useSWR(['/api/dashboard/articles', 'dashboard-articles'], fetcher)

	if (isLoading || !data) return <DataTableSkeleton />

	return (
		<div className='rounded-xl max-w-full overflow-hidden bg-accent p-2.5 lg:p-5 h-full flex flex-col'>
			<GenericDataTable data={data.articles} mutate={mutate} columns={articleColumns} />
		</div>
	)
}
