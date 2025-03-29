import ArticlesMainHeader from './article-main-header'
import ArticlesMainContent from './articles-main-content'

export default function ArticlesMain() {
	return (
		<main className='flex-1'>
			<ArticlesMainHeader />
			<ArticlesMainContent />
		</main>
	)
}
