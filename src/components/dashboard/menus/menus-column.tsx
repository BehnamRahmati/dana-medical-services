import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TLink, TMenu } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import axios from 'axios'
import { MoreSquare, Trash } from 'iconsax-react'

export const menusColumns: ColumnDef<TMenu>[] = [
	{
		accessorKey: 'id',
		header: '',
		cell: '',
	},
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
			const id = row.getValue('id') as string
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<MoreSquare className='stroke-content size-5' variant='Broken' />
					</DropdownMenuTrigger>
					<DropdownMenuContent align='start'>
						<DropdownMenuLabel> عملیات</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<button
								className='flex items-center gap-2 cursor-pointer'
								onClick={() => {
									axios.delete(`/api/dashboard/menus/${id}`)
								}}
							>
								<Trash className='stroke-content size-4 shrink-0' variant='Broken' />
								<p>حذف منو</p>
							</button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
