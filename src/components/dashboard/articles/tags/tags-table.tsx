'use client'
import { TTag } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { tagsColumns } from './tags-column'
import TagsDataTable from './tags-data-table'

async function fetcher(url: string): Promise<{ tags: TTag[] }> {
	const response = await axios.get(url)
	return await response.data
}

export default function TagsTable() {
	const { data, isLoading } = useSWR('/api/dashboard/tags', fetcher)

	if (isLoading || !data) return <p>loading</p>

	return <TagsDataTable columns={tagsColumns} data={data.tags} />
}
