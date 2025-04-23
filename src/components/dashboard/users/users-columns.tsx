import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TUser } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { MoreSquare } from 'iconsax-react'
import Image from 'next/image'
import UserAction from './cells/user-action'
export const UserColumns: ColumnDef<TUser>[] = [
	{
		accessorKey: 'image',
		header: 'تصویر',
		cell: ({ row }) => {
			const imageUrl = row.getValue('image') as string
			return <Image src={imageUrl} alt='image' width={100} height={50} className='w-10 object-cover shrink-0 rounded-lg' />
		},
	},
	{
		accessorKey: 'name',
		header: 'نام',
	},
	{
		accessorKey: 'email',
		header: 'ایمیل',
	},
	{
		accessorKey: 'role',
		header: 'نقش',
		cell({ row }) {
			const role = row.getValue('role') as string
			switch (role) {
				case 'ADMIN':
					return <div className='text-red-500 bg-red-500/20 w-fit py-1 px-2.5 rounded-md'>ادمین</div>
				case 'SUPERADMIN':
					return <div className='text-amber-500 bg-amber-500/20 w-fit py-1 px-2.5 rounded-md'>سوپر ادمین</div>
				case 'EXPERT':
					return <div className='text-green-500 bg-green-500/20 w-fit py-1 px-2.5 rounded-md'>متخصص</div>
				default:
					return <div className='text-content bg-content/20 w-fit py-1 px-2.5 rounded-md'>کاربر</div>
			}
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
						<UserAction id={id} />
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
