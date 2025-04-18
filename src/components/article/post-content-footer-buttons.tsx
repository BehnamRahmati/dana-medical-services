'use client'
import { Bookmark2, Heart, MessageText1 } from 'iconsax-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function PostContentFooterButtons({
	counts,
	slug,
}: {
	slug: string
	counts: { likes: number; comments: number; bookmarks: number }
}) {
	const [likes, setLikes] = useState(counts.likes)
	const [isLiking, setIsLiking] = useState(false)
	const [bookmarks, setBookmarks] = useState(counts.bookmarks)
	const [isBookmarking, setIsBookmarking] = useState(false)
	const { data: session } = useSession()

	async function handleAddBookmark() {
		if (!session?.user) {
			toast.error('برای افزودن به علاقه‌مندی‌ها لطفا وارد شوید', { icon: '🔒' })
			return
		}
		if (isBookmarking) return // Prevent double clicks
		setIsBookmarking(true) // Set loading state
		setBookmarks(prev => prev + 1) // Optimistic update

		const bookmarksSubmissionPromise = fetch(`/api/articles/${slug}/bookmarks`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userId: session?.user.id }),
		})

		toast.promise(bookmarksSubmissionPromise, {
			loading: 'در حال افزودن به علاقه‌مندی‌ها...',
			success: async response => {
				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData || `Request failed with status ${response.status}`)
				}
				setIsBookmarking(false)
				return 'مقاله به علاقه‌مندی‌ها اضافه شد'
			},
			error: error => {
				setIsBookmarking(false)
				setBookmarks(prev => prev - 1) // Revert optimistic update
				return `خطا در افزودن به علاقه‌مندی‌ها: ${error.message || 'لطفا دوباره تلاش کنید.'}`
			},
		})
	}

	async function handleAddLike() {
		if (!session?.user) {
			toast.error('برای افزودن به علاقه‌مندی‌ها لطفا وارد شوید', { icon: '🔒' })
			return
		}

		if (isLiking) return // Prevent double clicks
		setIsLiking(true) // Set loading state
		setLikes(prev => prev + 1) // Optimistic update

		const likesSubmissionPromise = fetch(`/api/articles/${slug}/likes`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userId: session?.user.id }),
		})

		toast.promise(likesSubmissionPromise, {
			loading: 'در حال افزودن به علاقه‌مندی‌ها...',
			success: async response => {
				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData || `Request failed with status ${response.status}`)
				}
				setIsLiking(false)
				return 'مقاله به علاقه‌مندی‌ها اضافه شد'
			},
			error: error => {
				setIsLiking(false)
				setLikes(prev => prev - 1) // Revert optimistic update
				return `خطا در افزودن به علاقه‌مندی‌ها: ${error.message || 'لطفا دوباره تلاش کنید.'}`
			},
		})
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
				<button
					onClick={() => handleAddLike()}
					disabled={isLiking}
					className='flex items-center gap-1 group hover:text-red-500'
				>
					<Heart className='fill-content size-6 hover:fill-red-500' variant='Bulk' />
					<span className='text-xl mt-1'>{likes}</span>
				</button>
			</li>
			<li>
				<button
					onClick={() => handleAddBookmark()}
					disabled={isBookmarking}
					className='flex items-center gap-1 group hover:text-secondary'
				>
					<Bookmark2 className='fill-content size-6 hover:fill-secondary' variant='Bulk' />
					<span className='text-xl mt-1'>{bookmarks}</span>
				</button>
			</li>
		</ul>
	)
}
