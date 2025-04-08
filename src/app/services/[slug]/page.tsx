import ServiceContent from '@/components/service/service-content'
import ServiceContentHeader from '@/components/service/service-content-header'
import { TServices } from '@/lib/types'
import axios from 'axios'

async function fetchServices(slug: string): Promise<TServices> {
	const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/services/${slug}`)
	return response.data.service
}

export default async function SingleServicesPage({ params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug
	const service = await fetchServices(slug)

	return (
		<div className='flex flex-col lg:flex-row gap-5 py-10 lg:py-20'>
			<div className='flex-1 bg-accent p-5 lg:p-10 rounded-xl'>
				<ServiceContentHeader thumbnail={service.thumbnail} title={service.title} readTime={service.readTime} />
				<ServiceContent content={service.content} />
				<div className=''>content footer</div>
			</div>
			<div className='lg:w-80'>
				<div className=''>content sidebar</div>
			</div>
		</div>
	)
}
