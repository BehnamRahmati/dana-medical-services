'use client'

import { TArticle } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { articleColumns } from './articles-column'
import ArticlesDataTable from './articles-data-table'

async function fetcher(url: string): Promise<{ articles: TArticle[] }> {
	const response = await axios.get(url)
	return await response.data
}

export default function ArticlesTable() {
	const { data, isLoading } = useSWR('/api/dashboard/articles', fetcher, {
		revalidateOnFocus: true,
		revalidateIfStale: true,
	})

	if (isLoading || !data) return <p>loading</p>

	return (
		<div className='rounded-xl max-w-full overflow-hidden bg-accent p-2.5 lg:p-5 h-full flex flex-col'>
			<ArticlesDataTable data={data.articles} columns={articleColumns} />
		</div>
	)
}
