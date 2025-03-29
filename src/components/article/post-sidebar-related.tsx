import { Cards } from 'iconsax-react'
import PostSidebarRelatedCard from './post-sidebar-related-card'

export default function PostSidebarRelated() {
	return (
		<div className='border border-border rounded-xl p-5 mb-5'>
			<div className='flex gap-2'>
				<Cards className='fill-content size-5' variant='Bulk' />
				<div className=''>
					<h3 className='text-lg font-bold'>مقالات مرتبط</h3>
					<p className='text-xs'>شما میتوانید مقالات مرتبط با این مقاله را اینجا مشاهده کنید.</p>
				</div>
			</div>
			<ul className='flex flex-col mt-5 gap-2'>
				{[1, 2, 3, 4, 5].map((_, index) => (
					<li key={'sd' + index}>
						<PostSidebarRelatedCard />
					</li>
				))}
			</ul>
		</div>
	)
}
