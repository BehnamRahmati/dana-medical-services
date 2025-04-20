import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { handleToastPromise } from '@/lib/helpers'
import { Edit, MoreSquare, Trash } from 'iconsax-react'
import Link from 'next/link'
import { useSWRConfig } from 'swr'
export default function ArticlesActionCell({ slug }: { slug: string }) {
	const { mutate } = useSWRConfig()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<MoreSquare className='stroke-content size-5' variant='Broken' />
			</DropdownMenuTrigger>
			<DropdownMenuContent align='start'>
				<DropdownMenuItem>
					<Link href={`/dashboard/articles/${slug}/edit`} className='flex items-center gap-2 text-amber-500'>
						<Edit className='stroke-amber-500 size-4 shrink-0' variant='Broken' />
						<p className='-mb-1'>ویرایش مقاله</p>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<button
						className='flex items-center gap-2 cursor-pointer text-red-500'
						onClick={async () => {
							const deleteArticle = fetch(`/api/dashboard/articles/${slug}`, {
								method: 'DELETE',
							})
							handleToastPromise(
								() => deleteArticle,
								'در حال حذف مقاله',
								'مقاله با موفقیت حذف شد',
								'خطا در حذف مقاله',
								() => mutate(['/api/dashboard/articles', 'da-articles']),
							)
						}}
					>
						<Trash className='stroke-red-500 size-4 shrink-0' variant='Broken' />
						<p className='-mb-1'>حذف مقاله</p>
					</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
