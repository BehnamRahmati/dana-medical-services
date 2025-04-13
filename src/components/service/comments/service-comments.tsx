'use client'

import { fetchComments } from '@/lib/helpers'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import ServiceCommentItem from './service-comment-item'

export default function ServiceComments() {
	const params = useParams()
	const { data, isLoading } = useSWR(`/api/services/${params?.slug}/comments`, fetchComments)

	if (isLoading || !data) return <p>loading</p>

	const comments = data.filter(comment => !comment.commentId && comment.approved)

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
