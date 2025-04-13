import { TService } from '@/lib/types'
import { Clock, Profile } from 'iconsax-react'
import Link from 'next/link'

export default function ServiceSidebarLatestCard({ service }: { service: TService }) {
	return (
		<div className='bg-accent rounded-md py-5'>
			<Link
				href={`/services/${service.slug}`}
				className='px-5 block text-sm font-bold relative before:content-[""] before:block before:bg-primary before:w-1 before:rounded-l-lg before:h-full before:border before:border-primary before:absolute before:right-0 before:top-0'
			>
				{service.title}
			</Link>
			<div className='flex items-center justify-end divide divide-x divide-content px-5 mt-2'>
				<Link href='/post/1' className='flex items-center gap-1 text-xs pl-1'>
					<Profile className='size-3 fill-content' variant='Bulk' />
					<span>{service.author.name}</span>
				</Link>
				<p className='text-xs pr-1'>
					<Clock className='size-3 fill-content inline-block ml-1' variant='Bulk' />
					<span>زمان مطالعه:</span>
					<span>{service.read} دقیقه</span>
				</p>
			</div>
		</div>
	)
}
