import ArticlesMain from '@/components/articles/articles-main'
import ArticlesProvider from '@/components/articles/articles-provider'
import ArticlesSidebar from '@/components/articles/articles-sidebar'

import { Metadata } from 'next'

// Define metadata for SEO
export const metadata: Metadata = {
	title: 'خدمات پزشکی دنا | مقالات پزشکی و پرستاری',
	description: 'مشاهده مقالات پزشکی دنا، مقالات پرستاری، پرستار و پزشک و پزشک های دنا',
	keywords: 'مقالات پزشکی دنا, مقالات پرستاری, پرستار و پزشک, پزشک های دنا',
	openGraph: {
		title: 'خدمات پزشکی دنا | مقالات پزشکی و پرستاری',
		description:
			'Explore our collection of medical articles covering the latest research, treatments, and health advice from Dana Medical Services experts.',
		url: `${process.env.NEXTAUTH_URL}/articles`,
		siteName: 'خدمات پزشکی دنا ',
		images: [
			{
				url: `${process.env.NEXTAUTH_URL}/uploads/`,
				width: 1200,
				height: 630,
				alt: 'Dana Medical Services Articles',
			},
		],
		locale: 'fa_IR',
		type: 'article',
	},
}

export default function ArticlesPage() {
	return (
		<ArticlesProvider>
			<div className='flex flex-col lg:flex-row gap-0 lg:gap-5 mt-10 lg:mt-20 container mx-auto'>
				<ArticlesSidebar />
				<ArticlesMain />
			</div>
		</ArticlesProvider>
	)
}
