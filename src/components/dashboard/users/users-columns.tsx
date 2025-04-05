import { TUser } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'

export const UserColumns: ColumnDef<TUser>[] = [
	{
		accessorKey: 'image',
		header: 'image',
		cell: ({ row }) => {
			const imageUrl = row.getValue('image') as string
			return <Image src={imageUrl} alt='image' width={100} height={50} className='w-12 object-cover shrink-0 rounded-lg' />
		},
	},
	{
		accessorKey: 'name',
		header: 'name',
	},
	{
		accessorKey: 'email',
		header: 'email',
	},
	{
		accessorKey: 'role',
		header: 'role',
	},
]
