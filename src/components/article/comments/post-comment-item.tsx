'use client'
import { TComment } from '@/lib/types'
import { Heart } from 'iconsax-react'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { toast } from 'sonner'
import { useSWRConfig } from 'swr'

export default function PostCommentItem({ comment, isReply }: { comment: TComment; isReply?: boolean }) {
	const { data: session } = useSession()
	const { mutate } = useSWRConfig()

	async function handleAddLike() {
		if (!session?.user) {
			toast.error('برای لایک کردن دیدگاه لطفا وارد شوید', { icon: '🔒' })
			return
		}
		const slug = comment.article?.slug

		const likePromise = fetch(`/api/articles/${slug}/comments`, {
			method: 'PUT',
			body: JSON.stringify({
				userId: session?.user.id,
				commentId: comment.id,
			}),
		})

		toast.promise(likePromise, {
			loading: 'در حال ارسال لایک',
			success: async response => {
				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData || `Request failed with status ${response.status}`)
				}
				mutate([`/api/articles/${comment.article?.slug}/comments`, 'article-comment'])
				return 'با موفقیت لایک شد'
			},
			error: 'خطا در لایک',
		})
	}

	return (
		<li>
			<div className={`border rounded-xl px-5 py-5 ${isReply ? 'bg-secondary/20 border-secondary' : 'border-border'}`}>
				<div className={`py-5 border-b ${isReply ? ' border-b-secondary' : 'border-b-border'} flex justify-between`}>
					<div className='flex items-center gap-2'>
						<div className='bg-content size-14 rounded-full'>
							<Image
								src={comment.user.image}
								alt={comment.user.name}
								className='rounded-full size-full'
								width={50}
								height={50}
							/>
						</div>
						<div className=''>
							<p className='font-bold text-xl'>{comment.user.name}</p>
							<p> {moment(comment.createdAt).locale('fa').fromNow()} </p>
						</div>
					</div>
					<div className=''>
						<button
							onClick={() => handleAddLike()}
							className='bg-red-500/20 py-1 px-2.5 rounded-sm flex items-center gap-1'
						>
							<Heart className='size-6 stroke-red-500' variant='TwoTone' />
							<span className='mt-1 text-lg text-red-500'>{comment._count?.likes}</span>
						</button>
					</div>
				</div>
				<div className='py-5'>
					<div className='py-5'> {comment.content} </div>
				</div>
			</div>
			{comment.replies && comment.replies.length > 0 && (
				<ul className='flex flex-col gap-5 my-5 mr-5'>
					{comment.replies.map(reply => (
						<PostCommentItem isReply comment={reply} key={reply.id} />
					))}
				</ul>
			)}
		</li>
	)
}
