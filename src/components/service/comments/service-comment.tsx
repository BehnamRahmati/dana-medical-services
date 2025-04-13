import ServiceCommentForm from './service-comment-form'
import ServiceComments from './service-comments'

export default function ServiceComment() {
	return (
		<div className='bg-accent border border-border p-5 lg:p-10 rounded-xl mt-10 '>
			<h2 className='text-3xl font-extrabold'>دیدگاه و پرسش</h2>
			<ServiceCommentForm />
			<ServiceComments />
		</div>
	)
}
