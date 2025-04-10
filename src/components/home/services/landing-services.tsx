'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { fetchServices } from '@/lib/helpers'
import useSWR from 'swr'
import HomeServicesCard from '../home-services-card'

export default function LandingServices() {
	const { data: services, isLoading } = useSWR('/api/services/landing', fetchServices)
	if (isLoading || !services)
		return (
			<div className='grid grid-cols-4 gap-10 py-10'>
				{[...new Array(4)].map((_, i) => (
					<div className='' key={'sklt' + i}>
						<Skeleton className='h-44 bg-accent w-3/4 mx-auto -mb-36 rounded-xl' />
						<Skeleton className='h-72 bg-accent w-full rounded-xl' />
					</div>
				))}
			</div>
		)
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 px-5 lg:px-0 lg:grid-cols-4 gap-10 py-10'>
			{services.map(service => (
				<HomeServicesCard service={service} key={service.id} />
			))}
		</div>
	)
}
