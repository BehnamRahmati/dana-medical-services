import { TServiceItem } from '@/lib/types'
import ServiceItem from './service-item'

export default function ServiceItemsList({ items }: { items: TServiceItem[] }) {
	return (
		<div className='flex flex-col gap-y-5 lg:gap-y-0 md:flex-row justify-center items-center lg:items-stretch lg:divide-x divide-border py-10'>
			{items.map(item => {
				return <ServiceItem item={item} key={item.title} />
			})}
		</div>
	)
}
