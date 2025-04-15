'use client'
import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { TMenu } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import LinkCreateForm from './links/link-create'
import { menusColumns } from './menus-column'
import MenuCreateForm from './menus-create'

async function fetcher(url: string): Promise<{ menus: TMenu[] }> {
	const response = await axios.get(url)
	return await response.data
}

export default function MenusTable() {
	const { data, isLoading, mutate } = useSWR('/api/dashboard/menus', fetcher)

	if (isLoading || !data) return <DataTableSkeleton />

	const renderCreateComponents = () => {
		return (
			<div className='flex gap-2'>
				<MenuCreateForm />
				<LinkCreateForm />
			</div>
		)
	}

	return (
		<div className='rounded-xl max-w-full overflow-hidden bg-accent h-full p-2.5 lg:p-5 flex flex-col flex-1'>
			<GenericDataTable
				filterColumn='name'
				data={data.menus}
				columns={menusColumns}
				mutate={mutate}
				createFormComponent={renderCreateComponents()}
			/>
		</div>
	)
}
