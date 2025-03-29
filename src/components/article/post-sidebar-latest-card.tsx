import { Clock, Profile } from 'iconsax-react'
import Link from 'next/link'

export default function PostSidebarLatestCard() {
	return (
		<div className='bg-accent rounded-md py-5'>
			<Link
				href='/post/1'
				className='px-5 block text-sm font-bold relative before:content-[""] before:block before:bg-primary before:w-1 before:rounded-l-lg before:h-full before:border before:border-primary before:absolute before:right-0 before:top-0'
			>
				آموزش کار با توابع در جاوا اسکریپت | راهی برای حرفه ای شدن
			</Link>
			<div className='flex items-center justify-end divide divide-x divide-content px-5 mt-2'>
				<Link href='/post/1' className='flex items-center gap-1 text-xs pl-1'>
					<Profile className='size-3 fill-content' variant='Bulk' />
					<span>سید شهاب حسینی</span>
				</Link>
				<p className='text-xs pr-1'>
					<Clock className='size-3 fill-content inline-block ml-1' variant='Bulk' />
					<span>زمان مطالعه:</span>
					<span>11 دقیقه</span>
				</p>
			</div>
		</div>
	)
}
