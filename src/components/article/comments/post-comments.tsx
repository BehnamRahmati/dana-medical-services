'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { dataFetcher } from '@/lib/helpers'
import { TComment } from '@/lib/types'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import PostCommentItem from './post-comment-item'

export default function ArticleComments() {
	const params = useParams()
	const { data, isLoading, error } = useSWR<{ comments: TComment[] }>(
		params?.slug ? [`/api/articles/${params.slug}/comments`, 'article-comment'] : null,
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

	// TODO: Filter comments (Consider moving this filtering to the API if possible)
	const comments = data.comments.filter(comment => !comment.commentId && comment.approved)

	return (
		<ul className='flex flex-col gap-10 mt-10'>
			{comments.length > 0 ? (
				comments.map(comment => <PostCommentItem comment={comment} key={comment.id} />)
			) : (
				<div className='text-center p-2.5 lg:p-10 border-4 border-dashed border-border bg-muted/50 '>
					هنوز هیچ دیدگاهی در مورد این مقاله ثبت نشده است.
				</div>
			)}
		</ul>
	)
}

export function PostCommentSkeleton() {
	return (
		<div className='bg-content/10 rounded-xl p-5'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<Skeleton className='bg-content/10 size-14 rounded-full' />
					<div className=''>
						<Skeleton className='bg-content/10 h-6 w-18 rounded-md' />
						<Skeleton className='bg-content/10 h-6 w-18 rounded-md mt-1' />
					</div>
				</div>

				<Skeleton className='bg-content/10 h-7 w-10 rounded-md' />
			</div>
			<div className='mt-5'>
				<Skeleton className='bg-content/10 h-28 w-full rounded-md' />
			</div>
		</div>
	)
}
