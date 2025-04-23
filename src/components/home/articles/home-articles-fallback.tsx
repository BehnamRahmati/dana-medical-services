import { PostCardSkeleton } from '@/components/ui/post-card'

export default function HomeArticlesFallback() {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-1/2 lg:absolute lg:-top-1/2 lg:left-10 '>
			<div className='grid grid-cols-1 gap-6'>
				{[...new Array(2)].map((_, i) => (
					<PostCardSkeleton key={'pst' + i} />
				))}
			</div>
			<div className='grid grid-cols-1 gap-6 lg:transform lg:translate-y-10'>
				{[...new Array(2)].map((_, i) => (
					<PostCardSkeleton key={'pst2' + i} />
				))}
			</div>
		</div>
	)
}
