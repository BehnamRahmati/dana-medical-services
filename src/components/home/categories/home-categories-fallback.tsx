import { Skeleton } from '@/components/ui/skeleton'

export default function HomeCategoriesFallback() {
	return (
		<div className='flex flex-col lg:flex-row items-center justify-center gap-10'>
			{[...Array(4)].map((_, i) => (
				<div key={'hcfb' + i} className='size-52 flex flex-col items-center justify-center '>
					<Skeleton className='h-10 bg-content/10 w-32 mb-2' />
					<Skeleton className='h-10 bg-content/10 w-32' />
				</div>
			))}
		</div>
	)
}
