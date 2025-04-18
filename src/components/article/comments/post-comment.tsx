import ArticleCommentForm from './post-comment-form'
import ArticleComments from './post-comments'

export default function PostComment() {
	return (
		<div className='bg-accent border border-border p-5 lg:p-10 rounded-xl mt-10 '>
			<h2 className='text-3xl font-extrabold'>دیدگاه و پرسش</h2>
			<ArticleCommentForm />
			<ArticleComments />
		</div>
	)
}
