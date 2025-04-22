import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { handleToastPromise } from '@/lib/helpers'
import { Trash } from 'iconsax-react'
import { useSWRConfig } from 'swr'

export default function ServiceCategoriesActions({ slug }: { slug: string }) {
	const { mutate } = useSWRConfig()
	return (
		<DropdownMenuItem>
			<button
				className='flex items-center gap-2 cursor-pointer'
				onClick={async () => {
					const delateAction = fetch(`/api/dashboard/categories/${slug}`, {
						method: 'DELETE',
					})
					handleToastPromise(
						() => delateAction,
						'درحال حذف دسته بندی',
						'دسته بندی با موفقیت حذف شد',
						'خطا در حذف دسته بندی',
						() => {
							mutate(['/api/dashboard/services/categories', 'services-categories'])
						},
					)
				}}
			>
				<Trash className='stroke-content size-4 shrink-0' variant='Broken' />
				<p>حذف دسته بندی</p>
			</button>
		</DropdownMenuItem>
	)
}
