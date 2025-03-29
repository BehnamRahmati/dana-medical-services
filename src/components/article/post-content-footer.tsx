import PostContentFooterButtons from './post-content-footer-buttons'
import PostContentFooterMeta from './post-content-footer-meta'
import PostContentFooterRating from './post-content-footer-rating'
import PostContentFooterSharing from './post-content-footer-sharing'
export default function PostContentFooter() {
	return (
		<div>
			<PostContentFooterRating />

			<div className='border-t border-t-border pt-10 mt-10'>
				<PostContentFooterMeta />
				<div className='flex flex-col md:flex-row gap-5 items-center justify-between mt-5 md:mt-10'>
					<PostContentFooterButtons />
					<PostContentFooterSharing />
				</div>
			</div>
		</div>
	)
}
