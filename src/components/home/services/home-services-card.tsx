import { TService } from '@/lib/types'
import { ArrowLeft3 } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
export default function HomeServicesCard({ service }: { service: TService }) {
	return (
		<div className='bg-accent border border-border rounded-xl mt-12 group'>
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
			<div className='info w-11/12 mx-auto'>
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
