import ArticlesEditForm from '@/components/dashboard/articles/article-edit'
import { TArticles } from '@/lib/types'
import axios from 'axios'

async function getArticle(url: string): Promise<TArticles> {
	const response = await axios.get(url)
	return await response.data.article
}

export default async function EditArticle({ params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug
	const article = await getArticle(`http://localhost:3000/api/dashboard/articles/${slug}`)
	return (
		<div>
			<ArticlesEditForm article={article} />
		</div>
	)
}
