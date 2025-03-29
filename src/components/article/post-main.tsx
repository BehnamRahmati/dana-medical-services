import PostComment from './post-comment'
import PostContent from './post-content'
import PostContentFooter from './post-content-footer'
import PostContentHeader from './post-content-header'
import PostSimilars from './post-similars'

export default function PostMain() {
	return (
		<div className='flex-1'>
			<main className='bg-accent border border-border p-5 lg:p-10 rounded-xl'>
				<PostContentHeader />
				<PostContent />
				<PostContentFooter />
			</main>
			<PostSimilars />
			<PostComment />
		</div>
	)
}
