import { handleToastPromise } from '@/lib/helpers'
import { Forbidden2 } from 'iconsax-react'
import { useSWRConfig } from 'swr'

export default function RejectActionButton({ id }: { id: string }) {
	const { mutate } = useSWRConfig()
	return (
		<button
			className='flex items-center gap-2 cursor-pointer text-red-500'
			onClick={async () => {
				const rejectRequest = fetch(`/api/dashboard/requests/${id}`, {
					method: 'PATCH',
					body: JSON.stringify({ status: 'REJECTED' }),
				})
				handleToastPromise(
					() => rejectRequest,
					'در حال رد درخواست',
					'درخواست با موفقیت رد شد',
					'خطا در رد درخواست',
					() => mutate(['/api/dashboard/requests', 'dr-requests']),
				)
			}}
		>
			<Forbidden2 className='stroke-red-500 size-4 shrink-0' variant='Broken' />
			<p className='mt-1.5'>رد درخواست</p>
		</button>
	)
}
