import { handleToastPromise } from '@/lib/helpers'
import { Trash } from 'iconsax-react'
import { useSWRConfig } from 'swr'

export default function DeleteActionButton({ slug }: { slug: string }) {
	const { mutate } = useSWRConfig()
	return (
		<button
			className='flex items-center gap-2 cursor-pointer text-red-500'
			onClick={async () => {
				const deleteRequest = fetch(`/api/dashboard/tags/${slug}`, {
					method: 'DELETE',
				})
				handleToastPromise(
					() => deleteRequest,
					'در حال حذف برچسب',
					'برچسب مورد نظر با موفقیت حذف شد',
					'مشکلی در حذف برچسب به وجود آمده است',
					() => mutate(['/api/dashboard/tags', 'dat-tag']),
				)
			}}
		>
			<Trash className='stroke-red-500 size-4 shrink-0' variant='Broken' />
			<p className='-mb-1'>حذف برچسب</p>
		</button>
	)
}
