import PostMain from '@/components/article/post-main'
import PostSidebar from '@/components/article/post-sidebar'
import PostViews from '@/components/article/post-views'
import { serverDataFetcher } from '@/lib/helpers'
import { TArticle } from '@/lib/types'
import { Metadata } from 'next'

export default async function SingleArticlePage({ params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug
	const article = (await serverDataFetcher<{ article: TArticle }>(`/api/articles/${slug}`)).article

	return (
		<div className='flex flex-col lg:flex-row gap-2.5 lg:gap-5 p-2.5 lg:p-0 container mx-auto md:mt-10 lg:my-20'>
			<PostMain article={article} />
			<PostSidebar article={article} />
			<PostViews postSlug={article.slug} />
		</div>
	)
}

// Generate dynamic metadata based on the article
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const slug = (await params).slug
	const article = (await serverDataFetcher<{ article: TArticle }>(`/api/articles/${slug}`)).article

	// Extract the first few sentences for description (or use a dedicated excerpt field if available)
	const description = article.excerpt ? article.excerpt : 'این مقاله را از خدمات پزشکی دنا بخوانید'

	return {
		title: `${article.title} | خدمات پزشکی دنا`,
		description: description,
		keywords: article.tags?.join(', ') || 'خدمات پزشکی, مقاله , پرستاری , ',
		openGraph: {
			title: article.title,
			description: description,
			url: `${process.env.NEXTAUTH_URL}/articles/${article.slug}`,
			siteName: 'Dana Medical Services',
			images: [
				{
					url: article.thumbnail || `${process.env.NEXTAUTH_URL}/images/default-article.jpg`,
					width: 1200,
					height: 630,
					alt: article.title,
				},
			],
			locale: 'fa_IR',
			type: 'article',
			publishedTime: article.createdAt.toString(),
			authors: [article.author?.name || 'خدمات پزشکی دنا'],
		},
	}
}
