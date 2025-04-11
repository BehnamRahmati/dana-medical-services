'use client'
import { lazy, Suspense } from 'react'
import Section from '../../ui/section'
import Title from '../../ui/title'
import HomeCategoriesFallback from './home-categories-fallback'
const HomeCategoriesList = lazy(() => import('@/components/home/categories/home-categories-list'))

export default function HomeCategories() {
	return (
		<Section>
			<div className='lg:gap-10 py-20 my-20 px-5 '>
				<div className='w-fit mx-auto mb-15'>
					<Title>دسته بندی خدمات</Title>
				</div>
				<Suspense fallback={<HomeCategoriesFallback />}>
					<HomeCategoriesList />
				</Suspense>
			</div>
		</Section>
	)
}
