import { TService } from '@/lib/types'
import { ArrowLeft3 } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import { Skeleton } from './skeleton'

export default function ServicesCard({ service }: { service: TService }) {
	return (
		<div className='bg-accent border border-border rounded-xl mt-12 group flex flex-col'>
			<div className='bg-primary/60 w-11/12 rounded-xl h-44 mx-auto -mt-12 overflow-hidden flex items-center justify-center'>
				<Image
					alt='image'
					src={service.thumbnail}
					width={300}
					height={300}
					loading='lazy'
					className='size-full rounded-xl transform group-hover:scale-110 transition-transform duration-200 ease-in-out'
				/>
			</div>
			<div className='info w-11/12 mx-auto flex-1'>
				<Link href={`/services?category:${service.category?.slug}`} className='text-secondary mt-3 text-sm block'>
					{service.category?.name}
				</Link>
				<Link
					href={`/services/${service.slug}`}
					className='text-2xl font-extrabold text-content mb-4 mt-2 transition-colors duration-200 hover:text-primary/80 block'
				>
					{service.title}
				</Link>
				<p className='text-sm font-light text-slate-400 line-clamp-3' title={service.excerpt}>
					{service.excerpt}
				</p>
			</div>
			<Link
				href={`/services/${service.slug}`}
				className='mt-5 text-center py-3 border-t border-t-border rounded-b-xl text-primary flex items-center justify-center transition-colors duration-200 hover:bg-primary/10'
			>
				<span className='text-lg font-bold'>مشاهده</span>
				<ArrowLeft3 size={25} className='fill-primary inline-block' variant='Bulk' />
			</Link>
		</div>
	)
}

export function ServiceCardSkeleton() {
	return (
		<div className='bg-content/10 rounded-xl mt-12 group flex flex-col h-[350px] w-full'>
			<Skeleton className='w-11/12 rounded-xl h-44 mx-auto -mt-12 bg-content/10' />
			<div className='info w-11/12 mx-auto flex-1'>
				<Skeleton className='w-22 rounded-md h-5 bg-content/10 my-2' />
				<Skeleton className='w-full rounded-md h-8 bg-content/10 mb-5' />
				<Skeleton className='w-full rounded-md h-28 bg-content/10 mb-2.5' />
			</div>
		</div>
	)
}
