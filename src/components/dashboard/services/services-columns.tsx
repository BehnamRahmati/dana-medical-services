import Button from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TService } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowSwapVertical, MoreSquare } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import ServicesActions from './cells/services-actions'

export const ServicesColumns: ColumnDef<TService>[] = [
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
				<Link href={`/services/${slug}`} className=' bg-background px-1.5 py-1 rounded-md inline-block text-xs'>
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
		accessorKey: 'status',
		header: 'وضعیت',
		cell({ row }) {
			const status = row.getValue('status') as string
			switch (status) {
				case 'PUBLISHED':
					return <div className='text-green-500 bg-green-500/20 w-fit py-1 px-2.5 rounded-md'>منتشر شده</div>
					break
				case 'DRAFT':
					return <div className='text-amber-500 bg-amber-500/20 w-fit py-1 px-2.5 rounded-md'>پیش نویس</div>
					break
				default:
					return <div className='text-content bg-content/20 w-fit py-1 px-2.5 rounded-md'>بایگانی</div>
					break
			}
		},
	},

	{
		accessorKey: 'read',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					زمان مطالعه
					<ArrowSwapVertical className='stroke-content size-4 shrink-0' variant='Broken' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const readTime = row.getValue('read') as string
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
						<ServicesActions slug={slug} />
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
