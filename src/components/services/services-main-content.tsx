'use client'

import useServices from '@/hooks/use-services'
import PaginationCustom from '../ui/pagination-custom'
import ServicesCard from '../ui/service-card'
import { Skeleton } from '../ui/skeleton'

export default function ServicesMainContent() {
	const { data, isLoading, error } = useServices()
	if (isLoading) {
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
				{Array.from({ length: 6 }).map((_, index) => (
					<Skeleton key={index} className='h-[350px] w-full bg-content/10 rounded-md' />
				))}
			</div>
		)
	}
	if (error) {
		return (
			<div className='text-center text-destructive p-10 border border-destructive/50 rounded-md'>
				خطا در بارگذاری خدمات. لطفا دوباره تلاش کنید.
			</div>
		)
	}

	if (!data || data.services.length === 0) {
		return (
			<div className='col-span-1 md:col-span-2 lg:col-span-3 text-center border-4 border-dashed border-border p-10 rounded-md'>
				هیچ خدمتی یافت نشد.
			</div>
		)
	}
	return (
		<div className=''>
			<div className='grid grid-cols-1 md:grid-cols-2 px-2.5 lg:px-0 lg:grid-cols-3 gap-5'>
				{data.services.map(service => (
					<ServicesCard service={service} key={service.id} />
				))}
			</div>
			{data.pagination.totalPages > 1 && (
				<PaginationCustom totalPages={data.pagination.totalPages} currentPage={data.pagination.currentPage} />
			)}
		</div>
	)
}
