'use client'

import useVisibleSection from '@/hooks/use-visible-section'
import { lazy, Suspense } from 'react'
import Section from '../../ui/section'
import Title from '../../ui/title'
import HomeMoreLink from '../home-more-link'
import HomeArticlesInsta from './home-article-insta'
import HomeArticlesFallback from './home-articles-fallback'

const HomeArticlesList = lazy(() => import('@/components/home/articles/home-articles-list'))

export default function HomeArticles() {
	const { sectionRef, isVisible } = useVisibleSection()
	return (
		<Section
			ref={sectionRef}
			className={`px-2.5 lg:px-5 transition-all transform duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
		>
			<div className='flex flex-col lg:flex-row gap-10 bg-content/10 py-20 my-20 lg:my-52 px-2.5 md:px-10 lg:rounded-xl relative'>
				<div className='flex flex-col items-center lg:w-1/3 gap-10 text-center'>
					<Title>آخرین مقالات</Title>
					<p className='text-content'>
						نوشتن کار جالبیه که از هزاران سال همراه ما بوده و کمک کرده تا همیشه به روز باشیم، ما در راکت فضای رو به
						شکلی آماده کردیم تا شما بتونید ایده‌ها و مطالب جالب حوزه برنامه‌نویسی رو در اختیار هزاران برنامه‌نویس عضو
						راکت قرار بدید.
					</p>
					<HomeMoreLink
						href='/articles'
						className='border border-border lg:w-fit px-5 py-2 rounded-lg hover:border-primary justify-center'
					>
						مشاهده همه مقالات
					</HomeMoreLink>
				</div>
				{isVisible && (
					<Suspense fallback={<HomeArticlesFallback />}>
						<HomeArticlesList />
					</Suspense>
				)}
			</div>

			<HomeArticlesInsta />
		</Section>
	)
}
