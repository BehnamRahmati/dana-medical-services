'use client'
import useVisibleSection from '@/hooks/use-visible-section'
import { lazy, Suspense } from 'react'
import Section from '../../ui/section'
import Title from '../../ui/title'
import HomeMoreLink from '../home-more-link'
import HomeServicesFallback from './home-services-Fallback'
const HomeServicesList = lazy(() => import('@/components/home/services/home-services-list'))

export default function HomeServices() {
	const { sectionRef, isVisible } = useVisibleSection()

	return (
		<Section
			ref={sectionRef}
			className={`px-2.5 lg:px-5 transition-all transform duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
		>
			<div className='flex flex-col md:flex-row justify-between items-center gap-10 mt-20'>
				<Title>خدمات</Title>
				<HomeMoreLink href='/services'>مشاهده همه خدمات</HomeMoreLink>
			</div>
			{isVisible && (
				<Suspense fallback={<HomeServicesFallback />}>
					<HomeServicesList />
				</Suspense>
			)}
		</Section>
	)
}
