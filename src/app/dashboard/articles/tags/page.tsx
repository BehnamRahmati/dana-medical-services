import TagsCreate from '@/components/dashboard/articles/tags/tags-create'
import TagsTable from '@/components/dashboard/articles/tags/tags-table'

export default function DashboardTags() {
	return (
		<div className='flex gap-5 h-full'>
			<div className='flex-1 h-full bg-accent rounded-lg p-5 flex flex-col'>
				<TagsTable />
			</div>
			<TagsCreate />
		</div>
	)
}
