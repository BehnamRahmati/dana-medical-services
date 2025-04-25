'use client'
import { dataFetcher } from '@/lib/helpers'
import { TService } from '@/lib/types'
import Link from 'next/link'
import useSWR from 'swr'
import { Skeleton } from '../ui/skeleton'
import FooterTitle from './footer-title'

export default function FooterTopServices() {
	const { data, isLoading } = useSWR<{ services: TService[] }>(['/api/services/landing', 'footer-services'], dataFetcher)
	return (
		<div className='flex flex-col items-start gap-5'>
			<FooterTitle>برخی از خدمات دنا</FooterTitle>
			<ul className='flex flex-col gap-2.5'>
				{isLoading || !data ? (
					<li className='flex flex-col gap-2.5'>
						<Skeleton className='bg-muted h-7 w-44' />
						<Skeleton className='bg-muted h-7 w-44' />
						<Skeleton className='bg-muted h-7 w-44' />
					</li>
				) : (
					data.services?.map(service => (
						<li key={service.id}>
							<Link href={`/services/${service.slug}`}>{service.title}</Link>
						</li>
					))
				)}
			</ul>
		</div>
	)
}
