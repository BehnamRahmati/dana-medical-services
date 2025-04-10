'use client'
import { TComment } from '@/lib/types'
import axios from 'axios'
import { Heart } from 'iconsax-react'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function PostCommentItem({ comment, isReply }: { comment: TComment; isReply?: boolean }) {
	const { data: session } = useSession()

	async function handleAddLike() {
		if (!session?.user) {
			return alert('لطفا وارد حساب کاربری خود شوید')
		}
		await axios.patch(`/api/articles/${comment.article.slug}/comments`, { userId: session?.user.id, commentId: comment.id })
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
							<span className='mt-1 text-lg text-red-500'>{comment._count.likes}</span>
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
