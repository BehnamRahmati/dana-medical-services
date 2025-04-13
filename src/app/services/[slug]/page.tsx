import ServiceComment from '@/components/service/comments/service-comment'
import ServiceSidebarLatest from '@/components/service/latest/service-sidebar-latest'
import ServiceContent from '@/components/service/service-content'
import ServiceContentHeader from '@/components/service/service-content-header'
import ServiceSimilars from '@/components/service/similars/service-similars'
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
		<div className='flex flex-col lg:flex-row gap-5 py-5 lg:py-20 px-2.5 lg:px-5'>
			<div className='flex-1 '>
				<div className='bg-accent p-2.5 lg:p-10 rounded-xl'>
					<ServiceContentHeader
						category={service.ServiceCategory.name}
						categorySlug={service.ServiceCategory.slug}
						thumbnail={service.thumbnail}
						title={service.title}
						readTime={service.readTime}
					/>
					<ServiceContent content={service.content} />
				</div>
				<ServiceSimilars categorySlug={service.ServiceCategory.slug} serviceId={service.id} />
				<ServiceComment />
			</div>
			<div className='lg:w-80'>
				<ServiceSidebarLatest />
			</div>
		</div>
	)
}
