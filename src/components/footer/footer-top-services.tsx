'use client'
import { fetchServices } from '@/lib/helpers'
import Link from 'next/link'
import useSWR from 'swr'
import { Skeleton } from '../ui/skeleton'
import FooterTitle from './footer-title'

export default function FooterTopServices() {
	const { data: services, isLoading } = useSWR('/api/services/landing', fetchServices)
	return (
		<div className='flex flex-col items-start gap-5'>
			<FooterTitle>برخی از خدمات دنا</FooterTitle>
			<ul className='flex flex-col gap-2.5'>
				{isLoading || !services ? (
					<li className='flex flex-col gap-2.5'>
						<Skeleton className='bg-muted h-7 w-44' />
						<Skeleton className='bg-muted h-7 w-44' />
						<Skeleton className='bg-muted h-7 w-44' />
					</li>
				) : (
					services?.map(service => (
						<li key={service.id}>
							<Link href={`/services/${service.slug}`}>{service.title}</Link>
						</li>
					))
				)}
			</ul>
		</div>
	)
}
