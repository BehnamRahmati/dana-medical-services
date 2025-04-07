import { Category, Clock } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'

type TProps = { category: string; title: string; readTime: number; thumbnail: string }

export default function PostContentHeader({ category, title, readTime, thumbnail }: TProps) {
	return (
		<div>
			<div className='w-full bg-content rounded-2xl overflow-hidden'>
				<Image src={thumbnail} className='w-full' alt='title' width={1000} height={600} />
			</div>
			<div className='flex flex-col sm:flex-row items-center gap-5 mt-5'>
				<Link href='/' className='py-2 px-5 bg-primary text-white rounded-lg flex items-center gap-1'>
					<Category className='size-5 fill-white' variant='Bulk' />
					{category}
				</Link>
				<div className='flex items-center gap-1'>
					<Clock className='size-5 fill-content' variant='Bulk' />
					<span>زمان مطالعه:</span>
					<span>{readTime} دقیقه</span>
				</div>
			</div>
			<h1 className='text-3xl lg:text-5xl font-extrabold leading-14 lg:leading-20 mt-5'>{title}</h1>
		</div>
	)
}
