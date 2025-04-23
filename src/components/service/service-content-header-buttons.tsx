'use client'
import { dataFetcher } from '@/lib/helpers'
import { Bookmark2, Heart, MessageText1 } from 'iconsax-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'
import useSWR, { useSWRConfig } from 'swr'

export default function ServiceContentheadererButtons({
	counts,
	slug,
}: {
	slug: string
	counts: { likes: number; comments: number; bookmarks: number }
}) {
	const [isLiking, setIsLiking] = useState(false)
	const [isBookmarking, setIsBookmarking] = useState(false)
	const { data: session } = useSession()
	const { data: likesData, isLoading: likesLoading } = useSWR<{ likes: number }>(
		[`/api/services/${slug}/likes`, 'service-likes'],
		dataFetcher,
	)
	const { data: bookmarksData, isLoading: bookmarksLoading } = useSWR<{ bookmarks: number }>(
		[`/api/services/${slug}/bookmarks`, 'service-bookmarks'],
		dataFetcher,
	)
	const { mutate } = useSWRConfig()

	async function handleAddBookmark() {
		if (!session?.user) {
			toast.error('برای افزودن به نشان شده ها لطفا وارد شوید', { icon: '🔒' })
			return
		}
		if (isBookmarking) return // Prevent double clicks
		setIsBookmarking(true) // Set loading state

		const bookmarksSubmissionPromise = fetch(`/api/services/${slug}/bookmarks`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userId: session?.user.id }),
		})

		toast.promise(bookmarksSubmissionPromise, {
			loading: 'در حال افزودن به نشان شده ها...',
			success: async response => {
				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData || `Request failed with status ${response.status}`)
				}
				setIsBookmarking(false)
				mutate([`/api/services/${slug}/bookmarks`, 'service-bookmarks'])
				return 'مقاله به نشان شده ها اضافه شد'
			},
			error: error => {
				setIsBookmarking(false) // Revert optimistic update
				return `خطا در افزودن به نشان شده ها: ${error.message || 'لطفا دوباره تلاش کنید.'}`
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

		const likesSubmissionPromise = fetch(`/api/services/${slug}/likes`, {
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
				mutate([`/api/services/${slug}/likes`, 'service-likes'])
				return 'مقاله به علاقه‌مندی‌ها اضافه شد'
			},
			error: error => {
				setIsLiking(false)
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
					<span className='text-xl mt-1'>{likesLoading || !likesData ? 0 : likesData.likes}</span>
				</button>
			</li>
			<li>
				<button
					onClick={() => handleAddBookmark()}
					disabled={isBookmarking}
					className='flex items-center gap-1 group hover:text-secondary'
				>
					<Bookmark2 className='fill-content size-6 hover:fill-secondary' variant='Bulk' />
					<span className='text-xl mt-1'>{bookmarksLoading || !bookmarksData ? 0 : bookmarksData.bookmarks}</span>
				</button>
			</li>
		</ul>
	)
}
