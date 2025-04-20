import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import axios from 'axios'
import { TickSquare } from 'iconsax-react'
import { toast } from 'sonner'
import { useSWRConfig } from 'swr'

export default function ApproveCell({ id }: { id: string }) {
	const { mutate } = useSWRConfig()
	return (
		<DropdownMenuItem>
			<button
				className='flex items-center gap-2 cursor-pointer text-green-500'
				onClick={async () => {
					try {
						toast('در حال تایید دیدگاه', { icon: '⏳' })
						axios.patch(`/api/dashboard/comments`, { commentId: id })
						toast('دیدگاه با موفقیت تایید شد', { icon: '✅' })
						mutate(['/api/dashboard/comments', 'dc-comments'])
					} catch (error) {
						console.log(error)
						toast('خطا در تایید دیدگاه', { icon: '❌' })
					}
				}}
			>
				<TickSquare className='stroke-green-500 size-4 shrink-0' variant='Broken' />
				<p className='mt-1.5'>تایید دیدگاه</p>
			</button>
		</DropdownMenuItem>
	)
}
