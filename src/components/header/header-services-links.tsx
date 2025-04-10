'use client'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { fetchServices } from '@/lib/helpers'
import { ArrowDown2 } from 'iconsax-react'
import Link from 'next/link'
import useSWR from 'swr'
import { Skeleton } from '../ui/skeleton'

export default function HeaderServicesLinks() {
	const { data: services, isLoading } = useSWR('/api/services/landing', fetchServices)
	return (
		<li>
			<HoverCard>
				<HoverCardTrigger asChild>
					<Link href={'/services'} className='flex items-center gap-2.5'>
						<span>خدمات</span>
						<ArrowDown2 className='size-4 fill-content' variant='Bulk' />
					</Link>
				</HoverCardTrigger>
				<HoverCardContent align='start' alignOffset={-15} sideOffset={20}>
					<ul className='flex flex-col gap-2.5 *:w-full w-full'>
						{isLoading || !services ? (
							<li className='flex flex-col gap-2.5'>
								<Skeleton className='bg-muted h-7 w-full'></Skeleton>
								<Skeleton className='bg-muted h-7 w-full'></Skeleton>
								<Skeleton className='bg-muted h-7 w-full'></Skeleton>
							</li>
						) : (
							services?.map(service => (
								<li key={service.id}>
									<Link
										href={`/services/${service.slug}`}
										className='p-2.5 hover:bg-muted block rounded-md w-full'
									>
										{service.title}
									</Link>
								</li>
							))
						)}
					</ul>
				</HoverCardContent>
			</HoverCard>
		</li>
	)
}
