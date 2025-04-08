'use client'
import axios from 'axios'
import { Bookmark2, Heart, MessageText1 } from 'iconsax-react'
import { useSession } from 'next-auth/react'

export default function PostContentFooterButtons({
	counts,
	slug,
}: {
	slug: string
	counts: { likes: number; comments: number; bookmarks: number }
}) {
	const { data: session } = useSession()

	async function handleAddBookmark() {
		if (!session?.user) {
			return alert('لطفا وارد حساب کاربری خود شوید')
		}
		await axios.put(`/api/articles/${slug}/bookmarks`, { userId: session?.user.id })
	}

	async function handleAddLike() {
		if (!session?.user) {
			return alert('لطفا وارد حساب کاربری خود شوید')
		}
		await axios.put(`/api/articles/${slug}/likes`, { userId: session?.user.id })
	}
	return (
		<ul className='flex gap-5'>
			<li>
				<div className='flex items-center gap-1 hover:text-primary group'>
					<MessageText1 className='fill-content size-6 hover:fill-primary' variant='Bulk' />
					<span className='text-xl mt-1'>{counts.comments}</span>
				</div>
			</li>
			<li>
				<button onClick={() => handleAddLike()} className='flex items-center gap-1 group hover:text-red-500'>
					<Heart className='fill-content size-6 hover:fill-red-500' variant='Bulk' />
					<span className='text-xl mt-1'>{counts.likes}</span>
				</button>
			</li>
			<li>
				<button onClick={() => handleAddBookmark()} className='flex items-center gap-1 group hover:text-secondary'>
					<Bookmark2 className='fill-content size-6 hover:fill-secondary' variant='Bulk' />
					<span className='text-xl mt-1'>{counts.bookmarks}</span>
				</button>
			</li>
		</ul>
	)
}
