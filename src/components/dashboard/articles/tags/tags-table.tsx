'use client'
import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { TTag } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { tagsColumns } from './tags-column'
import TagsCreate from './tags-create'

async function fetcher(url: string): Promise<{ tags: TTag[] }> {
	const response = await axios.get(url)
	return await response.data
}

export default function TagsTable() {
	const { data, isLoading, mutate } = useSWR('/api/dashboard/tags', fetcher)

	if (isLoading || !data) return <DataTableSkeleton />

	return (
		<div className='bg-accent rounded-xl flex flex-col p-2.5 lg:p-5'>
			<GenericDataTable
				filterColumn='name'
				columns={tagsColumns}
				mutate={mutate}
				data={data.tags}
				createFormComponent={<TagsCreate mutate={mutate} />}
			/>
		</div>
	)
}
