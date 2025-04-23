'use client'

import { PostCommentSkeleton } from '@/components/article/comments/post-comments'
import { dataFetcher } from '@/lib/helpers'
import { TComment } from '@/lib/types'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import ServiceCommentItem from './service-comment-item'

export default function ServiceComments() {
	const params = useParams()
	const { data, isLoading, error } = useSWR<{ comments: TComment[] }>(
		[`/api/services/${params?.slug}/comments`, 'service-comments'],
		dataFetcher,
	)

	if (isLoading)
		return (
			<div className='flex flex-col gap-5'>
				<PostCommentSkeleton />
				<div className='pr-5'>
					<PostCommentSkeleton />
				</div>
				<PostCommentSkeleton />
			</div>
		)

	if (error)
		return (
			<div className='text-center p-2.5 lg:p-10 border-4 border-dashed border-border bg-muted/50 mt-5'>
				خطایی رخ داده است.
			</div>
		)

	if (!data)
		return (
			<div className='text-center p-2.5 lg:p-10 border-4 border-dashed border-border bg-muted/50 mt-5'>
				محتوای مورد نظر یافت نشد.
			</div>
		)

	const comments = data.comments.filter(comment => !comment.commentId && comment.approved)

	return (
		<ul className='flex flex-col gap-10 mt-10'>
			{comments.length > 0 ? (
				comments.map(comment => <ServiceCommentItem comment={comment} key={comment.id} />)
			) : (
				<div className='text-center p-2.5 lg:p-10 border-4 border-dashed border-border bg-muted/50 '>
					هنوز هیچ دیدگاهی در مورد این خدمت ثبت نشده است.
				</div>
			)}
		</ul>
	)
}
