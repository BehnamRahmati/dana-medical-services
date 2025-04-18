import { Category, Clock } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'

type TProps = { title: string; read: number; thumbnail: string; category?: string; categorySlug?: string }

export default function ServiceContentHeader({ category, categorySlug, title, read, thumbnail }: TProps) {
	return (
		<div>
			<div className='w-full bg-content rounded-2xl overflow-hidden'>
				<Image
					src={thumbnail}
					className='w-full'
					loading='lazy'
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					alt='title'
					width={1000}
					height={600}
				/>
			</div>
			<div className='flex flex-row items-center gap-5 mt-5'>
				<Link
					href={`/services?category=${categorySlug}`}
					className='py-1 lg:py-2 px-2.5 lg:px-5 gap-2 bg-primary text-white rounded-lg flex items-center '
				>
					<Category className='size-5 fill-white' variant='Bulk' />
					{category}
				</Link>
				<div className='flex items-center gap-1'>
					<Clock className='size-5 fill-content' variant='Bulk' />
					<span>زمان مطالعه:</span>
					<span>{read} دقیقه</span>
				</div>
			</div>
			<h1 className='text-3xl lg:text-5xl font-extrabold leading-14 lg:leading-20 mt-5'>{title}</h1>
		</div>
	)
}
