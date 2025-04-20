import { handleToastPromise } from '@/lib/helpers'
import { Trash } from 'iconsax-react'
import { useSWRConfig } from 'swr'

export default function DeleteActionButton({ id }: { id: string }) {
	const { mutate } = useSWRConfig()
	return (
		<button
			className='flex items-center gap-2 cursor-pointer text-red-500'
			onClick={async () => {
				const deleteComment = fetch(`/api/dashboard/comments/${id}`, {
					method: 'DELETE',
				})
				handleToastPromise(
					() => deleteComment,
					'در حال حذف دیدگاه',
					' دیدگاه با موفقیت حذف شد',
					'خطا در حذف دیدگاه',
					() => mutate(['/api/dashboard/comments', 'dc-comments']),
				)
			}}
		>
			<Trash className='stroke-red-500 size-4 shrink-0' variant='Broken' />
			<p className='mt-1.5'>حذف دیدگاه</p>
		</button>
	)
}
