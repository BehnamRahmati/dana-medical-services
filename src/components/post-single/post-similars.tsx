import PostCard from '../ui/post-card'

export default function PostSimilars() {
	return (
		<div className='mt-10'>
			<div className='text-5xl font-extrabold'>پست های مشابه</div>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-5 xl:gap-10 mt-5'>
				{[...new Array(3)].map((_, i) => (
					<PostCard key={'rtsd' + i} />
				))}
			</div>
		</div>
	)
}
