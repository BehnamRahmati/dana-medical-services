'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { dataFetcher } from '@/lib/helpers'
import { TService } from '@/lib/types'
import { ArrowLeft3, Cards } from 'iconsax-react'
import Link from 'next/link'
import useSWR from 'swr'
import ServiceSidebarLatestCard from './service-sidebar-latest-card'

export default function ServiceSidebarLatest() {
	const { data, isLoading } = useSWR<{ services: TService[] }>(['/api/services/landing', 'home-services'], dataFetcher)

	if (isLoading || !data)
		return (
			<div className='flex flex-col gap-5 mb-5'>
				<Skeleton className='h-14 w-full bg-content/10' />
				<Skeleton className='h-14 w-full bg-content/10' />
				<Skeleton className='h-14 w-full bg-content/10' />
				<Skeleton className='h-14 w-full bg-content/10' />
			</div>
		)
	return (
		<div className='border border-border rounded-xl p-5 mb-5'>
			<div className='flex gap-2'>
				<Cards className='fill-content size-5' variant='Bulk' />
				<div className=''>
					<h3 className='text-lg font-bold'>4 خدمت اخیر</h3>
					<p className='text-xs'>شما میتوانید 4 خدمت اخیر را اینجا مشاهده کنید.</p>
				</div>
			</div>
			<ul className='flex flex-col mt-5 gap-2'>
				{data.services.map(service => (
					<li key={'ltst' + service.id}>
						<ServiceSidebarLatestCard service={service} />
					</li>
				))}
			</ul>

			<Link
				href='/services'
				className='block mx-auto w-fit border border-primary rounded-lg mt-10 py-2.5 px-5 text-primary'
			>
				<span>مشاهده خدمات</span>
				<ArrowLeft3 className='size-6 fill-primary inline-block mr-2' variant='Bulk' />
			</Link>
		</div>
	)
}
