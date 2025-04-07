import { TComment } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'

export const CommentColumns: ColumnDef<TComment>[] = [
	{
		accessorKey: 'article',
		header: 'مقاله',
	},
	{
		accessorKey: 'content',
		header: 'محتوا',
	},
	{
		accessorKey: 'approved',
		header: 'تایید شده',
		cell({ row }) {
			const approved = row.getValue('approved') as string
			if (approved) {
				;<div className='text-green-500 bg-green-500/20 w-fit py-1 px-2.5 rounded-md'>تایید شده</div>
			}
			return <div className='text-amber-500 bg-amber-500/20 w-fit py-1 px-2.5 rounded-md'>بلاتکلیف</div>
		},
	},
]
