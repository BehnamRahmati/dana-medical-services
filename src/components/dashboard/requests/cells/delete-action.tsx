import { handleToastPromise } from '@/lib/helpers'
import { Trash } from 'iconsax-react'
import { useSWRConfig } from 'swr'

export default function DeleteActionButton({ id }: { id: string }) {
	const { mutate } = useSWRConfig()
	return (
		<button
			className='flex items-center gap-2 cursor-pointer text-red-500'
			onClick={async () => {
				const deleteRequest = fetch(`/api/dashboard/requests/${id}`, {
					method: 'DELETE',
				})
				await handleToastPromise(
					() => deleteRequest,
					'در حال حذف درخواست',
					'درخواست با موفقیت حذف شد',
					'خطا در حذف درخواست',
					() => mutate(['/api/dashboard/requests', 'dr-requests']),
				)
			}}
		>
			<Trash className='stroke-red-500 size-4 shrink-0' variant='Broken' />
			<p className='mt-1.5'>حذف درخواست</p>
		</button>
	)
}
