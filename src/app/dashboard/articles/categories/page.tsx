import CategroriesCreate from '@/components/dashboard/articles/categories/categories-create'
import CategoriesTable from '@/components/dashboard/articles/categories/categories-table'

export default function DashboardCategories() {
	return (
		<div className='flex gap-5 h-full'>
			<div className='flex-1 h-full bg-accent rounded-lg p-5 flex flex-col'>
				<CategoriesTable />
			</div>
			<CategroriesCreate />
		</div>
	)
}
