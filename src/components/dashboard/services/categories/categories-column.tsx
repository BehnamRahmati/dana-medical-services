import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TCategory } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import axios from 'axios'
import { MoreSquare, Trash } from 'iconsax-react'
import ServicesCategroriesEdit from './categories-edit'

export const ServicescategoriesColumns: ColumnDef<TCategory>[] = [
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
			const name = row.getValue('name') as string
			const id = row.original.id as string
			return (
				<div className='flex items-center gap-2.5'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<MoreSquare className='stroke-content size-5' variant='Broken' />
						</DropdownMenuTrigger>
						<DropdownMenuContent align='start'>
							<DropdownMenuItem>
								<button
									className='flex items-center gap-2 cursor-pointer'
									onClick={() => {
										axios.delete(`/api/dashboard/categories/${slug}`)
									}}
								>
									<Trash className='stroke-content size-4 shrink-0' variant='Broken' />
									<p>حذف دسته بندی</p>
								</button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<ServicesCategroriesEdit slug={slug} name={name} id={id} />
				</div>
			)
		},
	},
]
