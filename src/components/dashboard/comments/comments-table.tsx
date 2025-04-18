'use client'

import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { dataFetcher } from '@/lib/helpers'
import { TComment } from '@/lib/types'
import useSWR from 'swr'
import { CommentColumns } from './comments-columns'

export default function CommentsTable() {
	const { data, isLoading, mutate } = useSWR<{ comments: TComment[] }>(
		['/api/dashboard/comments', 'dashboard-comments'],
		dataFetcher,
	)

	if (isLoading || !data) return <DataTableSkeleton />

	return (
		<div className='rounded-xl  max-w-full overflow-hidden bg-accent p-2.5 lg:p-5 h-full flex flex-col'>
			<GenericDataTable filterColumn='content' data={data.comments} mutate={mutate} columns={CommentColumns} />
		</div>
	)
}
