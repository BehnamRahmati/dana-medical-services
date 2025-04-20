import { handleToastPromise } from '@/lib/helpers'
import { Trash } from 'iconsax-react'
import { useSWRConfig } from 'swr'

export default function DeleteActionButton({ slug }: { slug: string }) {
	const { mutate } = useSWRConfig()
	return (
		<button
			className='flex items-center gap-2 cursor-pointer text-red-500'
			onClick={async () => {
				const deleteCat = fetch(`/api/dashboard/categories/${slug}`, {
					method: 'DELETE',
				})
				handleToastPromise(
					() => deleteCat,
					'در حال حذف دسته بندی',
					'دسته بندی با موفقیت حذف شد',
					'خطا در حذف دسته بندی',
					() => {
						mutate(['/api/dashboard/articles/categories', 'dac-categories'])
					},
				)
			}}
		>
			<Trash className='stroke-red-500 size-4 shrink-0' variant='Broken' />
			<p>حذف دسته بندی</p>
		</button>
	)
}
