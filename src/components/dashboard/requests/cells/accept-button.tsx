import { handleToastPromise } from '@/lib/helpers'
import { TickSquare } from 'iconsax-react'
import { useSWRConfig } from 'swr'

export default function AcceptActionButton({ id }: { id: string }) {
	const { mutate } = useSWRConfig()
	return (
		<button
			className='flex items-center gap-2 cursor-pointer text-green-500'
			onClick={async () => {
				const acceptRequest = fetch(`/api/dashboard/requests/${id}`, {
					method: 'PATCH',
					body: JSON.stringify({ status: 'ACCEPTED' }),
				})
				handleToastPromise(
					() => acceptRequest,
					'در حال تایید درخواست',
					'درخواست با موفقیت تایید شد',
					'خطا در تایید درخواست',
					() => mutate(['/api/dashboard/requests', 'dr-requests']),
				)
			}}
		>
			<TickSquare className='stroke-green-500 size-4 shrink-0' variant='Broken' />
			<p className='mt-1.5'>تایید درخواست</p>
		</button>
	)
}
