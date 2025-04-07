import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TCategory } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import axios from 'axios'
import { Edit, MoreSquare, Trash } from 'iconsax-react'
import Link from 'next/link'

export const categoriesColumns: ColumnDef<TCategory>[] = [
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
						<DropdownMenuLabel> عملیات</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href={`/dashboard/articles/${slug}/edit`} className='flex items-center gap-2'>
								<Edit className='stroke-content size-4 shrink-0' variant='Broken' />
								<p>ویرایش مقاله</p>
							</Link>
						</DropdownMenuItem>
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
			)
		},
	},
]
