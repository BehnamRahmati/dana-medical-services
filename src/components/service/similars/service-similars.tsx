'use client'

import useVisibleSection from '@/hooks/use-visible-section'
import { lazy, Suspense } from 'react'
import ServiceSimilarsFallback from './service-similars-fallback'
const ServiceSimilarsList = lazy(() => import('./service-similars-list'))

export default function ServiceSimilars({ categorySlug, serviceId }: { categorySlug?: string; serviceId: string }) {
	const { isVisible, sectionRef } = useVisibleSection()
	return (
		<section
			ref={sectionRef}
			className={`mt-2.5 lg:mt-10 transition-all transform duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
		>
			<div className='text-5xl font-extrabold'>خدمت های مشابه</div>
			{isVisible && (
				<Suspense fallback={<ServiceSimilarsFallback />}>
					<ServiceSimilarsList serviceId={serviceId} categorySlug={categorySlug} />
				</Suspense>
			)}
		</section>
	)
}
