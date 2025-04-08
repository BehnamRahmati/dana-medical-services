import { TUser } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
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
					break
				case 'MODERATOR':
					return <div className='text-amber-500 bg-amber-500/20 w-fit py-1 px-2.5 rounded-md'>متخصص</div>
					break
				default:
					return <div className='text-content bg-content/20 w-fit py-1 px-2.5 rounded-md'>کاربر</div>
					break
			}
		},
	},
	{
		accessorKey: 'action',
		header: 'عملیات',
	},
]
