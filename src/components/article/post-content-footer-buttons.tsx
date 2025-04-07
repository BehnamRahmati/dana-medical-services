import { Bookmark2, Heart, MessageText1 } from 'iconsax-react'
import Link from 'next/link'

export default function PostContentFooterButtons({ counts }: { counts: { likes: number; comments: number; bookmarks: number } }) {
	return (
		<ul className='flex gap-5'>
			<li>
				<Link href='#' className='flex items-center gap-1 hover:text-primary group'>
					<MessageText1 className='fill-content size-6 hover:fill-primary' variant='Bulk' />
					<span className='text-xl mt-1'>{counts.comments}</span>
				</Link>
			</li>
			<li>
				<Link href='#' className='flex items-center gap-1 group hover:text-red-500'>
					<Heart className='fill-content size-6 hover:fill-red-500' variant='Bulk' />
					<span className='text-xl mt-1'>{counts.likes}</span>
				</Link>
			</li>
			<li>
				<Link href='#' className='flex items-center gap-1 group hover:text-secondary'>
					<Bookmark2 className='fill-content size-6 hover:fill-secondary' variant='Bulk' />
					<span className='text-xl mt-1'>{counts.bookmarks}</span>
				</Link>
			</li>
		</ul>
	)
}
