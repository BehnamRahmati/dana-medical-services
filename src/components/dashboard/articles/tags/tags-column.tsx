import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TTag } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { MoreSquare } from 'iconsax-react'
import DeleteActionButton from './cells/delete-action'
export const tagsColumns: ColumnDef<TTag>[] = [
	{
		accessorKey: 'name',
		header: 'عنوان',
	},
	{
		accessorKey: 'slug',
		header: 'پیوند یکتا',
	},
	{
		accessorKey: 'action',
		header: 'عملیات',
		cell: ({ row }) => {
			const slug = row.getValue('slug') as string
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<MoreSquare className='stroke-content size-5' variant='Broken' />
					</DropdownMenuTrigger>
					<DropdownMenuContent align='start'>
						<DropdownMenuItem>
							<DeleteActionButton slug={slug} />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
