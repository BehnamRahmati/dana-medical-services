import Button from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TServices } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowSwapVertical, Edit, MoreSquare } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'

export const ServicesColumns: ColumnDef<TServices>[] = [
	{
		accessorKey: 'thumbnail',
		header: 'تصویر',
		cell: ({ row }) => {
			const imageUrl = row.getValue('thumbnail') as string
			return <Image src={imageUrl} alt='thumbnail' width={100} height={50} className='w-22 object-cover shrink-0' />
		},
	},

	{
		accessorKey: 'title',
		header: 'عنوان',
	},
	{
		accessorKey: 'slug',
		header: 'پیوند یکتا',
		cell: ({ row }) => {
			const slug = row.getValue('slug') as string
			return (
				<Link href={`/articles/${slug}`} className=' bg-background px-1.5 py-1 rounded-md inline-block text-xs'>
					{slug}
				</Link>
			)
		},
	},
	{
		accessorKey: 'author',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					نویسنده
					<ArrowSwapVertical className='stroke-content size-4 shrink-0' variant='Broken' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const author = row.getValue('author') as { name: string }
			return <span className=' bg-background px-1.5 py-1 rounded-md inline-block text-xs'>{author.name}</span>
		},
	},
	{
		accessorKey: 'excerpt',
		header: 'توضیح مختصر',
	},

	{
		accessorKey: 'content',
		header: 'محتوا',
	},

	{
		accessorKey: 'readTime',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					زمان مطالعه
					<ArrowSwapVertical className='stroke-content size-4 shrink-0' variant='Broken' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const readTime = row.getValue('readTime') as string
			return <span className=' bg-background px-1.5 py-1 rounded-md inline-block text-xs'>{readTime} دقیقه</span>
		},
	},
	{
		accessorKey: 'actions',
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
								<p>ویرایش</p>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
