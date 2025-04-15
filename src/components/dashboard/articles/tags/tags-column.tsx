import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TTag } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import axios from 'axios'
import { MoreSquare, Trash } from 'iconsax-react'
import { toast } from 'sonner'
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
							<button
								className='flex items-center gap-2 cursor-pointer text-red-500'
								onClick={async () => {
									try {
										toast('در حال حذف برچسب', { icon: '⏳' })
										await axios.delete(`/api/dashboard/tags/${slug}`)
										toast('برچسب مورد نظر با موفقیت حذف شد', { icon: '✅' })
									} catch (error) {
										console.log(error)
										toast('مشکلی در حذف برچسب به وجود آمده است', { icon: '❌' })
									}
								}}
							>
								<Trash className='stroke-red-500 size-4 shrink-0' variant='Broken' />
								<p className='-mb-1'>حذف برچسب</p>
							</button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
