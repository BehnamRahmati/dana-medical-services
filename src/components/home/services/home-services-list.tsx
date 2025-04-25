'use client'

import ServicesCard from '@/components/ui/service-card'
import { dataFetcher } from '@/lib/helpers'
import { TService } from '@/lib/types'
import useSWR from 'swr'
import HomeServicesFallback from './home-services-Fallback'

export default function HomeServicesList() {
	const { data, isLoading } = useSWR<{ services: TService[] }>(['/api/services/landing', 'home-services'], dataFetcher)
	if (isLoading || !data) return <HomeServicesFallback />

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 2xl:gap-10 py-10'>
			{data.services.map(service => (
				<ServicesCard service={service} key={service.id} />
			))}
		</div>
	)
}
