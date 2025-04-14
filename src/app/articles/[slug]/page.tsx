import PostMain from '@/components/article/post-main'
import PostSidebar from '@/components/article/post-sidebar'
import { TArticle } from '@/lib/types'
import axios from 'axios'
async function fetchArticle(slug: string): Promise<TArticle> {
	const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/articles/${slug}`)
	return response.data.article
}

export default async function SingleArticlePage({ params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug
	const article = await fetchArticle(slug)

	return (
		<div className='flex flex-col lg:flex-row gap-2.5 lg:gap-5 p-2.5 lg:p-0 container mx-auto md:mt-10 lg:my-20'>
			<PostMain article={article} />
			<PostSidebar />
			{/* <PostViews postSlug={article.slug} /> */}
		</div>
	)
}
