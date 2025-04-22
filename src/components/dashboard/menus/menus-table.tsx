'use client'
import { DataTableSkeleton } from '@/components/ui/data-table'
import GenericDataTable from '@/components/ui/generic-data-table'
import { dataFetcher } from '@/lib/helpers'
import { TMenu } from '@/lib/types'
import useSWR from 'swr'
import LinkCreateForm from './links/link-create'
import { menusColumns } from './menus-column'
import MenuCreateForm from './menus-create'

export default function MenusTable() {
	const { data, isLoading, mutate, error } = useSWR<{ menus: TMenu[] }>(['/api/dashboard/menus', 'dm-menus'], dataFetcher)

	if (isLoading) return <DataTableSkeleton />
	if (error) return <p>خطا در بارگذاری دیتا</p>
	if (!data) return <p>هیچ دیتایی یافت نشد</p>

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
