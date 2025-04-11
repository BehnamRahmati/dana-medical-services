'use client'

import { fetchServices } from '@/lib/helpers'
import useSWR from 'swr'
import HomeServicesCard from './home-services-card'
import HomeServicesFallback from './home-services-Fallback'

export default function HomeServicesList() {
	const { data: services, isLoading } = useSWR('/api/services/landing', fetchServices)
	if (isLoading || !services) return <HomeServicesFallback />

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-10'>
			{services.map(service => (
				<HomeServicesCard service={service} key={service.id} />
			))}
		</div>
	)
}
