import { ArrowLeft3, Cards } from 'iconsax-react'
import Link from 'next/link'
import PostSidebarLatestCard from './post-sidebar-latest-card'

export default function PostSidebarLatest() {
	return (
		<div className='border border-border rounded-xl p-5 mb-5'>
			<div className='flex gap-2'>
				<Cards className='fill-content size-5' variant='Bulk' />
				<div className=''>
					<h3 className='text-lg font-bold'>5 مقاله اخیر</h3>
					<p className='text-xs'>شما میتوانید 5 مقاله اخیر را اینجا مشاهده کنید.</p>
				</div>
			</div>
			<ul className='flex flex-col mt-5 gap-2'>
				{[1, 2, 3, 4, 5].map((_, index) => (
					<li key={'sd' + index}>
						<PostSidebarLatestCard />
					</li>
				))}
			</ul>

			<Link href='/blog' className='block mx-auto w-fit border border-primary rounded-lg mt-10 py-2.5 px-5 text-primary'>
				<span>مشاهده مقالات</span>
				<ArrowLeft3 className='size-6 fill-primary inline-block mr-2' variant='Bulk' />
			</Link>
		</div>
	)
}
