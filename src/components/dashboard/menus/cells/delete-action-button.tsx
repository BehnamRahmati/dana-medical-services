import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { handleToastPromise } from '@/lib/helpers'
import { Trash } from 'iconsax-react'
import { useSWRConfig } from 'swr'

export default function DeleteActionButton({ id }: { id: string }) {
	const { mutate } = useSWRConfig()
	return (
		<DropdownMenuItem>
			<button
				className='flex items-center gap-2 cursor-pointer'
				onClick={async () => {
					const submitpromise = fetch(`/api/dashboard/menus/${id}`, { method: 'DELETE' })
					handleToastPromise(
						() => submitpromise,
						'در حال حذف منو ...',
						'منو با موفقیت حذف شد.',
						'خطا در حذف منو.',
						() => {
							mutate(['/api/dashboard/menus', 'dm-menus'])
						},
					)
				}}
			>
				<Trash className='stroke-content size-4 shrink-0' variant='Broken' />
				<p>حذف منو</p>
			</button>
		</DropdownMenuItem>
	)
}
