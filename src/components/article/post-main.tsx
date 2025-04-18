import { TArticle } from '@/lib/types'
import dynamic from 'next/dynamic'
import PostContent from './post-content'
import PostContentFooter from './post-content-footer'
import PostContentHeader from './post-content-header'
const PostComment = dynamic(() => import('./comments/post-comment'))
const ArticleSimilars = dynamic(() => import('./similars/article-similars'))

export default function PostMain({ article }: { article: TArticle }) {
	return (
		<div className='flex-1'>
			<main className='bg-accent border border-border p-2.5 md:p-5 lg:p-10 rounded-xl'>
				<PostContentHeader
					category={article.category.name}
					categorySlug={article.category.slug}
					read={article.read}
					title={article.title}
					thumbnail={article.thumbnail}
				/>
				<PostContent content={article.content} />
				<PostContentFooter article={article} />
			</main>
			<ArticleSimilars categorySlug={article.category.slug} />
			<PostComment />
		</div>
	)
}
