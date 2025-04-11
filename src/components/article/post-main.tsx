import { TArticles } from '@/lib/types'
import PostComment from './post-comment'
import PostContent from './post-content'
import PostContentFooter from './post-content-footer'
import PostContentHeader from './post-content-header'
import PostSimilars from './post-similars'

export default function PostMain({ article }: { article: TArticles }) {
	return (
		<div className='flex-1'>
			<main className='bg-accent border border-border p-2.5 md:p-5 lg:p-10 rounded-xl'>
				<PostContentHeader
					category={article.category.name}
					readTime={article.readTime}
					title={article.title}
					thumbnail={article.thumbnail}
				/>
				<PostContent content={article.content} />
				<PostContentFooter article={article} />
			</main>
			<PostSimilars articleId={article.id} categorySlug={article.category.slug} />
			<PostComment />
		</div>
	)
}
