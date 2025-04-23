import { ServiceCardSkeleton } from '@/components/ui/service-card'

export default function ServiceSimilarsFallback() {
	return (
		<div className='mt-10'>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
				<ServiceCardSkeleton />
				<ServiceCardSkeleton />
				<ServiceCardSkeleton />
			</div>
		</div>
	)
}
