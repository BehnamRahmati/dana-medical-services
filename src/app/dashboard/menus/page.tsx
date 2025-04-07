import LinkCreateForm from '@/components/dashboard/menus/links/link-create'
import MenuCreateForm from '@/components/dashboard/menus/menus-create'
import MenusTable from '@/components/dashboard/menus/menus-table'

export default function DashboardMenus() {
	return (
		<div className='flex flex-col lg:flex-row gap-5 h-full'>
			<div className='flex-1 bg-accent p-5 rounded-lg h-full flex flex-col'>
				<MenusTable />
			</div>
			<div className='lg:w-80'>
				<MenuCreateForm />
				<LinkCreateForm />
			</div>
		</div>
	)
}
