'use client'
import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { dataFetcher } from '@/lib/helpers'
import { TTag } from '@/lib/types'
import useSWR from 'swr'
import { tagsColumns } from './tags-column'
import TagsCreate from './tags-create'

export default function TagsTable() {
	const { data, isLoading, mutate, error } = useSWR<{ tags: TTag[] }>(['/api/dashboard/tags', 'dat-tag'], dataFetcher)

	if (isLoading) return <DataTableSkeleton />
	if (error) return <p className='text-red-500'>خطا در بارگذاری</p>
	if (!data) return <p className='text-red-500'>دیتا یافت نشد</p>

	return (
		<div className='bg-accent rounded-xl flex flex-col h-full p-2.5 lg:p-5'>
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
