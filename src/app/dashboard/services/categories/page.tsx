import ServicesCategroriesCreate from '@/components/dashboard/services/categories/categories-create'
import ServicesCategoriesTable from '@/components/dashboard/services/categories/categories-table'

export default function DashboardServicesCategoriesPage() {
	return (
		<div className='flex gap-5 h-full'>
			<div className='flex-1 h-full bg-accent rounded-lg p-5 flex flex-col'>
				<ServicesCategoriesTable />
			</div>
			<ServicesCategroriesCreate />
		</div>
	)
}
