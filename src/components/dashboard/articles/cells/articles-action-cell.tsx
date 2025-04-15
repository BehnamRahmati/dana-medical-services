import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import axios from 'axios'
import { Edit, MoreSquare, Trash } from 'iconsax-react'
import Link from 'next/link'
import { toast } from 'sonner'
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
							try {
								toast('در حال حذف مقاله', { icon: '⏳' })
								await axios.delete(`/api/dashboard/articles/${slug}`)
								toast(' مقاله با موفقیت حذف شد', { icon: '✅' })
								mutate(['/api/dashboard/articles', 'dashboard-articles'])
							} catch (error) {
								console.log(error)
								toast('خطا در حذف مقاله', { icon: '❌' })
							}
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
