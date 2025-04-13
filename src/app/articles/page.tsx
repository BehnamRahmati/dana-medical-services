import ArticlesMain from '@/components/articles/articles-main'
import ArticlesProvider from '@/components/articles/articles-provider'
import ArticlesSidebar from '@/components/articles/articles-sidebar'

export default function ArticlesPage() {
	return (
		<ArticlesProvider>
			<div className='flex flex-col lg:flex-row gap-0 lg:gap-5 mt-10 lg:mt-20 container mx-auto'>
				<ArticlesSidebar />
				<ArticlesMain />
			</div>
		</ArticlesProvider>
	)
}
