'use client'
import { dataFetcher } from '@/components/dashboard/articles/lib/helpers'
import { TServiceItem } from '@/lib/types'
import useSWR from 'swr'
import ServiceItem from './service-item'

export default function ServiceItemsList() {
	const { data, error, isLoading } = useSWR<{ serviceItems: TServiceItem[] }>('/api/dashboard/services/items', dataFetcher)

	if (error) return <div>خطایی رخ داده است</div>
	if (isLoading) return <div>در حال بارگزاری ...</div>
	if (!data) return <div>داده ای یافت نشد</div>
	return (
		<div className='flex flex-col gap-y-5 lg:gap-y-0 md:flex-row justify-center items-center lg:items-stretch lg:divide-x divide-border py-10'>
			{data.serviceItems.map(item => {
				return <ServiceItem item={item} key={item.title} />
			})}
		</div>
	)
}
