import { TComment } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'

export const CommentColumns: ColumnDef<TComment>[] = [
	{
		accessorKey: 'article',
		header: 'article',
	},
	{
		accessorKey: 'content',
		header: 'content',
	},
	{
		accessorKey: 'approved',
		header: 'approved',
	},
]
