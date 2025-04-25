import { ServiceCardSkeleton } from '@/components/ui/service-card'

export default function HomeServicesFallback() {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-4 gap-5 2xl:gap-10 mt-10'>
			{[...Array(4)].map((_, i) => (
				<ServiceCardSkeleton key={'hsfb' + i} />
			))}
		</div>
	)
}
