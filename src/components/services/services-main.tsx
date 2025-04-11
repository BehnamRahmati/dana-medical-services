'use client'

import useServices from '@/hooks/use-services'
import HomeServicesCard from '../home/services/home-services-card'

export default function ServicesMain() {
	const { data: services, isLoading } = useServices()
	if (isLoading || !services) return <div className=''>loading</div>
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 px-2.5 lg:px-0 lg:grid-cols-4 gap-5 py-10'>
			{services.map(service => (
				<HomeServicesCard service={service} key={service.id} />
			))}
		</div>
	)
}
