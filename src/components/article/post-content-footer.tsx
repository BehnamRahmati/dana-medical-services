import { TArticle } from '@/lib/types'
import PostContentFooterButtons from './post-content-footer-buttons'
import PostContentFooterMeta from './post-content-footer-meta'
import PostContentFooterRating from './post-content-footer-rating'
import PostContentFooterSharing from './post-content-footer-sharing'
export default function PostContentFooter({ article }: { article: TArticle }) {
	return (
		<div>
			<PostContentFooterRating />

			<div className='border-t border-t-border pt-10 mt-10'>
				<PostContentFooterMeta createdAt={article.createdAt} tags={article.tags} />
				<div className='flex flex-col md:flex-row gap-5 items-center justify-between mt-5 md:mt-10'>
					<PostContentFooterButtons counts={article._count!} slug={article.slug} />
					<PostContentFooterSharing slug={article.slug} />
				</div>
			</div>
		</div>
	)
}
