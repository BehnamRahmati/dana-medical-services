'use client'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import { NavigationMenuContent, NavigationMenuTrigger } from '@/components/ui/navigation-menu'

import { useIsMobile } from '@/hooks/use-mobile'
import { dataFetcher } from '@/lib/helpers'
import { TService } from '@/lib/types'
import { ArrowDown2 } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { Skeleton } from '../ui/skeleton'

export default function HeaderServicesLinks({ setOpen }: { setOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {
	const { data, isLoading } = useSWR<{ services: TService[] }>(['/api/services/menu', 'menu-services'], dataFetcher)
	const isMobile = useIsMobile()
	return (
		<>
			{isMobile ? (
				<Collapsible className='w-full px-4'>
					<CollapsibleTrigger className='flex items-center justify-between w-full'>
						<Link
							href={'/services'}
							className='w-fit hover:text-secondary'
							onClick={() => setOpen && setOpen(prev => !prev)}
						>
							<span>خدمات</span>
						</Link>
						<ArrowDown2 className='size-4 fill-content' variant='Bulk' />
					</CollapsibleTrigger>
					<CollapsibleContent>
						<ul className='flex flex-col gap-2.5 *:w-full w-full pt-2.5 max-h-72 overflow-y-auto pr-4'>
							{isLoading || !data ? (
								<li className='flex flex-col gap-2.5'>
									<Skeleton className='bg-muted h-7 w-full'></Skeleton>
									<Skeleton className='bg-muted h-7 w-full'></Skeleton>
									<Skeleton className='bg-muted h-7 w-full'></Skeleton>
								</li>
							) : (
								data.services.map(service => (
									<li key={service.id}>
										<Link
											href={`/services/${service.slug}`}
											onClick={() => setOpen && setOpen(prev => !prev)}
											className='p-1.5 bg-muted lg:bg-accent hover:bg-muted block rounded-md w-full'
										>
											<p>{service.title}</p>
										</Link>
									</li>
								))
							)}
						</ul>
					</CollapsibleContent>
				</Collapsible>
			) : (
				<>
					<NavigationMenuTrigger>خدمات</NavigationMenuTrigger>
					<NavigationMenuContent dir='rtl'>
						<ul className='grid grid-cols-4 gap-2.5 lg:w-5xl 2xl:w-7xl'>
							{isLoading || !data ? (
								<li className='flex flex-col gap-2.5'>
									<Skeleton className='bg-muted h-7 w-full'></Skeleton>
									<Skeleton className='bg-muted h-7 w-full'></Skeleton>
									<Skeleton className='bg-muted h-7 w-full'></Skeleton>
								</li>
							) : (
								data.services.map(service => (
									<li key={service.id}>
										<Link
											href={`/services/${service.slug}`}
											className='hover:bg-muted rounded-md flex items-center gap-2.5 p-2.5'
										>
											<div className='shrink-0 size-14'>
												<Image
													src={service.thumbnail}
													alt={service.title}
													width={200}
													height={200}
													className='rounded-md size-14'
												/>
											</div>
											<div className=''>
												<p className='font-bold'>{service.title}</p>
												<p className='line-clamp-2 text-sm text-content/60'>{service.excerpt}</p>
											</div>
										</Link>
									</li>
								))
							)}
						</ul>
					</NavigationMenuContent>
				</>
			)}
		</>
	)
}
