import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import axios from 'axios'
import { MoreSquare, Trash } from 'iconsax-react'
import { toast } from 'sonner'
import { useSWRConfig } from 'swr'
export default function ServiceItemActionCell({ id }: { id: string }) {
	const { mutate } = useSWRConfig()
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
								toast('در حال حذف آیتم', { icon: '⏳' })
								await axios.delete(`/api/dashboard/services/items/${id}`)
								toast(' آیتم با موفقیت حذف شد', { icon: '✅' })
								mutate('/api/dashboard/services/items')
							} catch (error) {
								console.log(error)
								toast('خطا در  حذف آیتم', { icon: '❌' })
							}
						}}
					>
						<Trash className='stroke-red-500 size-4 shrink-0' variant='Broken' />
						<p>حذف آیتم</p>
					</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
