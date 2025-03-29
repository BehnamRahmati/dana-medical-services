import { ArchiveBox } from 'iconsax-react'
import PostCard from '../ui/post-card'

export default function ArticlesMainContent() {
	return (
		<div>
			<div className='flex items-center gap-2'>
				<ArchiveBox className='fill-content size-10' variant='Bulk' />
				<h3 className='text-3xl font-bold mt-1'>آرشیو مقالات</h3>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 mt-5'>
				{[...new Array(9)].map((_, index) => (
					<PostCard key={'psart' + index} />
				))}
			</div>
		</div>
	)
}
