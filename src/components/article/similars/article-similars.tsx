'use client'

import useVisibleSection from '@/hooks/use-visible-section'
import { lazy, Suspense } from 'react'
import ArticleSimilarsFallback from './article-similars-fallback'
const ArticleSimilarsList = lazy(() => import('./article-similars-list'))

export default function ArticleSimilars({ categorySlug, articleId }: { categorySlug: string; articleId: string }) {
	const { isVisible, sectionRef } = useVisibleSection()
	return (
		<section
			ref={sectionRef}
			className={`mt-5 lg:mt-10 transition-all transform duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
		>
			<div className='text-5xl font-extrabold'> مقالات مشابه</div>
			{isVisible && (
				<Suspense fallback={<ArticleSimilarsFallback />}>
					<ArticleSimilarsList articleId={articleId} categorySlug={categorySlug} />
				</Suspense>
			)}
		</section>
	)
}
