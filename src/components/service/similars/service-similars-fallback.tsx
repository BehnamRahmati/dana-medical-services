import { Skeleton } from '@/components/ui/skeleton'

export default function ServiceSimilarsFallback() {
	return (
		<div className='mt-10'>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
				<Skeleton className='w-full h-[400px] bg-content/20 rounded-xl' />
				<Skeleton className='w-full h-[400px] bg-content/20 rounded-xl' />
				<Skeleton className='w-full h-[400px] bg-content/20 rounded-xl' />
			</div>
		</div>
	)
}
