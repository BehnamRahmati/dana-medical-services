import ArticleCategories from './sidebar/article-categories'
import ArticleSearch from './sidebar/article-search'
import ArticleTags from './sidebar/article-tags'

export default function ArticlesSidebar() {
	return (
		<aside className='w-full lg:w-80 flex flex-col gap-5'>
			<ArticleSearch />
			<ArticleTags />
			<ArticleCategories />
		</aside>
	)
}
