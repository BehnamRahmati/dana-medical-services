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
			{comments.length > 0
				? comments.map(comment => <PostCommentItem comment={comment} key={comment.id} />)
				: 'no comment yet'}
		</ul>
	)
}
