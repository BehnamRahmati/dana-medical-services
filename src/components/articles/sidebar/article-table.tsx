'use client'
import PostCard from '@/components/ui/post-card'
import useArticles from '@/hooks/use-articles'
export default function ArticlesTable() {
	const { table } = useArticles()
	return (
		<div className='grid grid-cols-3 gap-5'>
			{table.getRowModel().rows?.length &&
				table.getRowModel().rows.map(row => {
					const article = row.original
					return <PostCard key={article.id} article={article} />
				})}
		</div>
	)
}
