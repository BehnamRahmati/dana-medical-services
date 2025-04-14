'use client'

import { TComment } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { CommentColumns } from './comments-columns'
import CommentsDataTable from './comments-data-table'

async function fetcher(url: string): Promise<{ comments: TComment[] }> {
	const response = await axios.get(url)
	return await response.data
}
export default function CommentsTable() {
	const { data, isLoading } = useSWR('/api/dashboard/comments', fetcher)

	if (isLoading || !data) return <p>loading</p>

	return (
		<div className='rounded-xl  max-w-full overflow-hidden bg-accent p-2.5 lg:p-5 h-full flex flex-col'>
			<CommentsDataTable data={data.comments} columns={CommentColumns} />
		</div>
	)
}
