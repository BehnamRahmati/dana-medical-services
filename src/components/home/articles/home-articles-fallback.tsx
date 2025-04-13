import { Skeleton } from '@/components/ui/skeleton'

export default function HomeArticlesFallback() {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-1/2 lg:absolute lg:-top-1/2 lg:left-10 '>
			<div className='grid grid-cols-1 gap-6'>
				{[...new Array(2)].map((_, i) => (
					<Skeleton key={'pst1' + i} className='h-[400] w-full lg:w-[370px] bg-content/10' />
				))}
			</div>
			<div className='grid grid-cols-1 gap-6 lg:transform lg:translate-y-10'>
				{[...new Array(2)].map((_, i) => (
					<Skeleton key={'pst2' + i} className='h-[400] w-full lg:w-[370px] bg-content/10' />
				))}
			</div>
		</div>
	)
}
