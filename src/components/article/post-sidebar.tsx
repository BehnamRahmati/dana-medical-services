import PostSidebarLatest from './post-sidebar-latest'
import PostSidebarRelated from './post-sidebar-related'
import ArticleTableOfContent from './post-table-of-content'

export default function PostSidebar() {
	return (
		<aside className='w-full lg:w-80'>
			<PostSidebarLatest />
			<PostSidebarRelated />
			<ArticleTableOfContent />
		</aside>
	)
}
