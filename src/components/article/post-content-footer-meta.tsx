import { Clock } from 'iconsax-react'
import Link from 'next/link'

export default function PostContentFooterMeta() {
	return (
		<div className='flex flex-col md:flex-row gap-5 items-center justify-between'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<Clock className='size-6 fill-content ' variant='Bulk' />
					<div className='mt-1 '>5 ماه پیش</div>
				</div>
			</div>
			<ul className='flex items-center gap-2'>
				<li>
					<Link href='/' className='bg-content/20 pb-1 pt-1.5 px-2.5 rounded-sm inline-block text-sm'>
						#فیزیوتراپی
					</Link>
				</li>
				<li>
					<Link href='/' className='bg-content/20 pb-1 pt-1.5 px-2.5 rounded-sm inline-block text-sm'>
						#فیزیوتراپی
					</Link>
				</li>
				<li>
					<Link href='/' className='bg-content/20 pb-1 pt-1.5 px-2.5 rounded-sm inline-block text-sm'>
						#فیزیوتراپی
					</Link>
				</li>
			</ul>
		</div>
	)
}
