import Link from 'next/link'

export default function PostSidebarRelatedCard() {
	return (
		<div className='bg-accent rounded-md py-5'>
			<Link
				href='/post/1'
				className='px-5 block text-sm font-bold relative before:content-[""] before:block before:bg-primary before:w-1 before:rounded-l-lg before:h-full before:border before:border-primary before:absolute before:right-0 before:top-0'
			>
				آموزش کار با توابع در جاوا اسکریپت
			</Link>
		</div>
	)
}
