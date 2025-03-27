import PostMain from '@/components/post-single/post-main'
import PostSidebar from '@/components/post-single/post-sidebar'

export default function Single() {
	return (
		<div className='flex gap-10 container mx-auto my-20'>
			<PostMain />
			<PostSidebar />
		</div>
	)
}
