'use client'
import useArticles from '@/hooks/use-articles'
import { ArchiveBox } from 'iconsax-react'
import PostCard from '../ui/post-card'

export default function ArticlesMainContent() {
	const { articles, isLoading } = useArticles()

	if (isLoading || !articles) return <div className=''>loading</div>

	return (
		<div>
			<div className='flex items-center gap-2'>
				<ArchiveBox className='fill-content size-10' variant='Bulk' />
				<h3 className='text-3xl font-bold mt-1'>آرشیو مقالات</h3>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 mt-5'>
				{articles.map(article => (
					<PostCard article={article} key={article.id} />
				))}
			</div>
		</div>
	)
}
