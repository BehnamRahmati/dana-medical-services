import { TArticle } from '@/lib/types'
import ArticleTableOfContent from './post-table-of-content'
import PostSidebarLatest from './sidebar-latest/post-sidebar-latest'
import PostSidebarRelated from './sidebar-related/post-sidebar-related'

export default function PostSidebar({ article }: { article: TArticle }) {
	return (
		<aside className='w-full lg:w-80'>
			<PostSidebarLatest />
			<PostSidebarRelated tags={article.tags} />
			<ArticleTableOfContent />
		</aside>
	)
}
