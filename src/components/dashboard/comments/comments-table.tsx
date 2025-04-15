'use client'

import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { TComment } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { CommentColumns } from './comments-columns'

async function fetcher([url]: string[]): Promise<{ comments: TComment[] }> {
	const response = await axios.get(url)
	return await response.data
}
export default function CommentsTable() {
	const { data, isLoading, mutate } = useSWR(['/api/dashboard/comments', 'dashboard-comments'], fetcher)

	if (isLoading || !data) return <DataTableSkeleton />

	return (
		<div className='rounded-xl  max-w-full overflow-hidden bg-accent p-2.5 lg:p-5 h-full flex flex-col'>
			<GenericDataTable filterColumn='content' data={data.comments} mutate={mutate} columns={CommentColumns} />
		</div>
	)
}
