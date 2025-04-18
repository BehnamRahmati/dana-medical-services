import HomeCategories from '@/components/home/categories/home-categories'
import Homebanner from '@/components/home/home-banner'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const HomeServices = dynamic(() => import('@/components/home/services/home-services'))
const HomeArticles = dynamic(() => import('@/components/home/articles/home-articles'))
const HomeRequestForm = dynamic(() => import('@/components/home/home-request-form'))
const HomeRequestSteps = dynamic(() => import('@/components/home/home-request-steps'))
const HomeAccordion = dynamic(() => import('@/components/home/home-accordion'))

function LoadingFallback() {
	// You can replace this with a more sophisticated Skeleton loader
	return <div className='h-60 w-full flex items-center justify-center'>Loading section...</div>
}
export default function Home() {
	return (
		<main>
			<Homebanner />
			<HomeCategories />
			<Suspense fallback={<LoadingFallback />}>
				<HomeRequestForm />
			</Suspense>

			<Suspense fallback={<LoadingFallback />}>
				<HomeRequestSteps />
			</Suspense>

			<Suspense fallback={<LoadingFallback />}>
				<HomeServices />
			</Suspense>

			<Suspense fallback={<LoadingFallback />}>
				<HomeAccordion />
			</Suspense>

			<Suspense fallback={<LoadingFallback />}>
				<HomeArticles />
			</Suspense>
		</main>
	)
}
