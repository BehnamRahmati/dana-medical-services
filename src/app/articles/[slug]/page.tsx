import PostMain from '@/components/article/post-main'
import PostSidebar from '@/components/article/post-sidebar'

export default function Single() {
	return (
		<div className='flex flex-col lg:flex-row gap-5 p-2.5 lg:p-0 container mx-auto mt-10 lg:my-20'>
			<PostMain />
			<PostSidebar />
		</div>
	)
}
