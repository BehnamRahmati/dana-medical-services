import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { handleToastPromise } from '@/lib/helpers'
import { Edit, Trash } from 'iconsax-react'
import Link from 'next/link'
import { useSWRConfig } from 'swr'

export default function ServicesActions({ slug }: { slug: string }) {
	const { mutate } = useSWRConfig()
	return (
		<>
			<DropdownMenuItem>
				<Link href={`/dashboard/services/${slug}/edit`} className='flex items-center gap-2 text-amber-500'>
					<Edit className='stroke-amber-500 size-4 shrink-0' variant='Broken' />
					<p>ویرایش خدمت</p>
				</Link>
			</DropdownMenuItem>
			<DropdownMenuItem>
				<button
					className='flex items-center gap-2 cursor-pointer text-red-500'
					onClick={async () => {
						const deleteService = fetch(`/api/dashboard/services/${slug}`, {
							method: 'DELETE',
						})
						handleToastPromise(
							() => deleteService,
							'در حال حذف خدمت',
							'خدمت با موفقیت حذف شد',
							'خطا در حذف خدمت',
							() => mutate(['/api/dashboard/services', 'ds-services']),
						)
					}}
				>
					<Trash className='stroke-red-500 size-4 shrink-0' variant='Broken' />
					<p>حذف خدمت</p>
				</button>
			</DropdownMenuItem>
		</>
	)
}
