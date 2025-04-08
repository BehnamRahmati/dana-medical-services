'use client'

import { fetchServices } from '@/lib/helpers'
import useSWR from 'swr'
import HomeServicesCard from '../home-services-card'

export default function LandingServices() {
	const { data: services, isLoading } = useSWR('/api/services/landing', fetchServices)
	if (isLoading || !services) return <div className=''>loading</div>
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 px-5 lg:px-0 lg:grid-cols-4 gap-10 py-10'>
			{services.map(service => (
				<HomeServicesCard service={service} key={service.id} />
			))}
		</div>
	)
}
