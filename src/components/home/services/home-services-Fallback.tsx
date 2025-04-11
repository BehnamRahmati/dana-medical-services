import { Skeleton } from '@/components/ui/skeleton'

export default function HomeServicesFallback() {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-4 gap-10 mt-10'>
			{[...Array(4)].map((_, i) => (
				<div key={'hsfb' + i}>
					<Skeleton className='w-11/12 bg-content/10 h-44 -mb-32 mx-auto' />
					<Skeleton className='w-full bg-content/10 h-64' />
				</div>
			))}
		</div>
	)
}
