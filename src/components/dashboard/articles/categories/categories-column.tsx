import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TCategory } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import axios from 'axios'
import { MoreSquare, Trash } from 'iconsax-react'
import { toast } from 'sonner'

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
						<DropdownMenuItem>
							<button
								className='flex items-center gap-2 cursor-pointer text-red-500'
								onClick={async () => {
									try {
										toast('در حال حذف دسته بندی', { icon: '⏳' })
										await axios.delete(`/api/dashboard/categories/${slug}`)
										toast('دسته بندی با موفقیت حذف شد', { icon: '✅' })
									} catch (error) {
										console.log(error)
										toast('خطا در حذف دسته بندی', { icon: '❌' })
									}
								}}
							>
								<Trash className='stroke-red-500 size-4 shrink-0' variant='Broken' />
								<p>حذف دسته بندی</p>
							</button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
