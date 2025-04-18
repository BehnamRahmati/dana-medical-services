import ServiceItemsList from '@/components/service/items/service-items-list'
import ServiceSidebarLatest from '@/components/service/latest/service-sidebar-latest'
import ServiceContent from '@/components/service/service-content'
import ServiceContentHeader from '@/components/service/service-content-header'
import ServiceViews from '@/components/service/service-views'
import { serverDataFetcher } from '@/lib/helpers'
import { TService } from '@/lib/types'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const ServiceComment = dynamic(() => import('@/components/service/comments/service-comment'))
const ServiceSimilars = dynamic(() => import('@/components/service/similars/service-similars'))

// Generate dynamic metadata based on the article
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const slug = (await params).slug
	const service = (await serverDataFetcher<{ service: TService }>(`/api/services/${slug}`)).service

	// Extract the first few sentences for description (or use a dedicated excerpt field if available)
	const description = service.excerpt ? service.excerpt : 'این مقاله را از خدمات پزشکی دنا بخوانید'

	return {
		title: `${service.title} | خدمات پزشکی دنا`,
		description: description,
		openGraph: {
			title: service.title,
			description: description,
			url: `${process.env.NEXTAUTH_URL}/services/${service.slug}`,
			siteName: 'Dana Medical Services',
			images: [
				{
					url: service.thumbnail || `${process.env.NEXTAUTH_URL}/images/default-service.jpg`,
					width: 1200,
					height: 630,
					alt: service.title,
				},
			],
			locale: 'fa_IR',
			type: 'article',
			publishedTime: service.createdAt.toString(),
			authors: [service.author?.name || 'خدمات پزشکی دنا'],
		},
	}
}

export default async function SingleServicesPage({ params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug
	const service = (await serverDataFetcher<{ service: TService }>(`/api/services/${slug}`)).service

	return (
		<div className='flex flex-col lg:flex-row gap-5 py-5 lg:py-20 px-2.5 lg:px-5 container mx-auto'>
			<div className='flex-1 '>
				<div className='bg-accent p-2.5 lg:p-10 rounded-xl'>
					<ServiceContentHeader
						category={service.category?.name}
						categorySlug={service.category?.slug}
						thumbnail={service.thumbnail}
						title={service.title}
						read={service.read}
					/>
					<ServiceItemsList items={service.serviceItems} />
					<ServiceContent content={service.content} />
				</div>
				<ServiceSimilars categorySlug={service.category?.slug} serviceId={service.id} />
				<ServiceComment />
			</div>
			<div className='lg:w-80'>
				<ServiceSidebarLatest />
			</div>
			<ServiceViews serviceSlug={service.slug} />
		</div>
	)
}
