import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TLink, TMenu } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { MoreSquare } from 'iconsax-react'
import DeleteActionButton from './cells/delete-action-button'

export const menusColumns: ColumnDef<TMenu>[] = [
	{
		accessorKey: 'name',
		header: 'عنوان',
	},
	{
		accessorKey: 'links',
		header: 'لینک ها',
		cell({ row }) {
			const links = row.getValue('links') as TLink[]
			return (
				<ul className='flex gap-1 flex-wrap'>
					{links.map(link => (
						<li className='bg-content/10 py-1 px-2 rounded-md' key={link.id}>
							{link.name}
						</li>
					))}
				</ul>
			)
		},
	},
	{
		accessorKey: 'parent',
		header: 'منو والد',
		cell({ row }) {
			const parent = row.getValue('parent') as TMenu
			if (!parent) return <p>-</p>
			return <div className='w-fit bg-content/10 py-1 px-2 rounded-md'>{parent.name}</div>
		},
	},
	{
		accessorKey: 'action',
		header: 'عملیات',
		cell: ({ row }) => {
			const id = row.original.id as string
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<MoreSquare className='stroke-content size-5' variant='Broken' />
					</DropdownMenuTrigger>
					<DropdownMenuContent align='start'>
						<DeleteActionButton id={id} />
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
