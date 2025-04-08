import Button from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TArticles, TCategory, TTag, TUser } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import axios from 'axios'
import { ArrowSwapVertical, Edit, MoreSquare, Trash } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'

export const columns: ColumnDef<TArticles>[] = [
	{
		accessorKey: 'thumbnail',
		header: 'تصویر',
		cell: ({ row }) => {
			const imageUrl = row.getValue('thumbnail') as string
			return (
				<div className='h-7 w-16'>
					<Image
						src={imageUrl}
						alt='thumbnail'
						width={100}
						height={50}
						className='h-full w-auto object-cover shrink-0 rounded-md'
					/>
				</div>
			)
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
		accessorKey: 'views',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					بازدید
					<ArrowSwapVertical className='stroke-content size-4 shrink-0' variant='Broken' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const views = row.getValue('views') as number
			return <span className=' bg-background px-1.5 py-1 rounded-md inline-block text-xs mr-5'>{views}</span>
		},
	},
	{
		accessorKey: 'likes',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					لایک ها
					<ArrowSwapVertical className='stroke-content size-4 shrink-0' variant='Broken' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const likes = row.getValue('likes') as TUser[]
			return (
				<span className=' bg-background px-1.5 py-1 rounded-md inline-block text-xs mr-5'>
					{likes ? likes.length : '0'}
				</span>
			)
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
		accessorKey: 'tags',
		header: 'برچسب ها',
		cell: ({ row }) => {
			const tags = row.getValue('tags') as TTag[]
			if (!tags) return <p>برچسبی ندارد</p>
			return (
				<p className='flex items-center gap-1'>
					{tags.map(tag => (
						<span key={tag.id} className=' bg-background px-1.5 py-1 rounded-md inline-block text-xs'>
							{tag.name}
						</span>
					))}
				</p>
			)
		},
	},
	{
		accessorKey: 'category',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					دسته بندی
					<ArrowSwapVertical className='stroke-content size-4 shrink-0' variant='Broken' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const category = row.getValue('category') as TCategory
			return <span className=' bg-background px-1.5 py-1 rounded-md inline-block text-xs'>{category.name}</span>
		},
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
								<p>ویرایش مقاله</p>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<button
								className='flex items-center gap-2 cursor-pointer'
								onClick={() => {
									axios.delete(`/api/dashboard/articles/${slug}`)
								}}
							>
								<Trash className='stroke-content size-4 shrink-0' variant='Broken' />
								<p>حذف مقاله</p>
							</button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
