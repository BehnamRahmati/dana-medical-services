'use client'

import ServicesCard from '@/components/ui/service-card'
import { fetchServices } from '@/lib/helpers'
import { TServices } from '@/lib/types'
import useSWR from 'swr'
import ServiceSimilarsFallback from './service-similars-fallback'

function filterServices(data: TServices[], serviceId: string) {
	return data.filter(x => x.id !== serviceId)
}

export default function ServiceSimilarsList({ categorySlug, serviceId }: { categorySlug: string; serviceId: string }) {
	const { data, isLoading } = useSWR(`/api/services?category=${categorySlug}`, fetchServices)

	if (isLoading || !data) return <ServiceSimilarsFallback />

	const services = filterServices(data, serviceId)
	if (services.length === 0)
		return (
			<p className='text-center border-4 border-dashed border-border p-5 lg:p-10 w-full mt-5'>هیچ خدمت مشابه ای یافت نشد</p>
		)

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-5 xl:gap-10 mt-5'>
			{services.slice(0, 2).map(service => (
				<ServicesCard service={service} key={'similars' + service.id} />
			))}
		</div>
	)
}
