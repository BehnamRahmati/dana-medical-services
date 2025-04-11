import ArticlesMainHeader from './article-main-header'
import ArticlesMainContent from './articles-main-content'

export default function ArticlesMain() {
	return (
		<main className='flex-1 p-2.5 md:p-5 lg:p-0'>
			<ArticlesMainHeader />
			<ArticlesMainContent />
		</main>
	)
}
