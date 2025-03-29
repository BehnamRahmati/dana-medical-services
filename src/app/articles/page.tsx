import ArticlesMain from '@/components/articles/articles-main'
import ArticlesSidebar from '@/components/articles/articles-sidebar'

export default function Posts() {
	return (
		<div className='flex gap-5 mt-10 lg:mt-20 container mx-auto'>
			<ArticlesSidebar />
			<ArticlesMain />
		</div>
	)
}
