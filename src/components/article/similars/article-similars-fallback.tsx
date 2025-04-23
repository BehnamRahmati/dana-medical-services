import { PostCardSkeleton } from '@/components/ui/post-card'

export default function ArticleSimilarsFallback() {
	return (
		<div className='mt-10'>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
				<PostCardSkeleton />
				<PostCardSkeleton />
				<PostCardSkeleton />
			</div>
		</div>
	)
}
