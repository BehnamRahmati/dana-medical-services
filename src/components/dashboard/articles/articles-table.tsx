'use client'

import { TArticles } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { columns } from './articles-column'
import ArticlesDataTable from './articles-data-table'

async function fetcher(url: string): Promise<{ articles: TArticles[] }> {
	const response = await axios.get(url)
	return await response.data
}
export default function ArticlesTable() {
	const { data, isLoading } = useSWR('/api/dashboard/articles', fetcher)

	if (isLoading || !data) return <p>loading</p>

	return (
		<div className='rounded-md max-w-full overflow-hidden bg-accent p-5 h-full flex flex-col'>
			<ArticlesDataTable data={data.articles} columns={columns} />
		</div>
	)
}
