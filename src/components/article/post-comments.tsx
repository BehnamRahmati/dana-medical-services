'use client'

import { fetchComments } from '@/lib/helpers'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import PostCommentItem from './post-comment-item'

export default function ArticleComments() {
	const params = useParams()
	const { data, isLoading } = useSWR(`/api/articles/${params?.slug}/comments`, fetchComments)

	if (isLoading || !data) return <p>loading</p>

	const comments = data.filter(comment => !comment.commentId && comment.approved)

	return (
		<ul className='flex flex-col gap-10 mt-10'>
			{comments.length > 0 ? (
				comments.map(comment => <PostCommentItem comment={comment} key={comment.id} />)
			) : (
				<div className='text-center p-2.5 lg:p-5 border border-border rounded-lg bg-muted '>
					هنوز هیچ دیدگاهی در مورد این مقاله ثبت نشده است.
				</div>
			)}
		</ul>
	)
}
