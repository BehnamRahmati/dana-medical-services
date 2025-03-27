import PostSidebarLatest from './post-sidebar-latest'
import PostSidebarRelated from './post-sidebar-related'

export default function PostSidebar() {
	return (
		<aside className='w-80 border border-border rounded-2xl p-5'>
			<PostSidebarLatest />
			<PostSidebarRelated />
		</aside>
	)
}
