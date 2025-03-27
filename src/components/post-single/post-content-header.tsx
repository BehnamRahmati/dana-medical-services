import { Category, Clock } from 'iconsax-react'
import Link from 'next/link'

export default function PostContentHeader() {
	return (
		<div>
			<div className='w-full h-96 bg-content rounded-2xl'></div>
			<div className='flex items-center gap-5 mt-5'>
				<Link href='/' className='py-2 px-5 bg-primary text-white rounded-lg flex items-center gap-1'>
					<Category className='size-5 fill-white' variant='Bulk' />
					فیزیوتراپی در خانه
				</Link>
				<div className='flex items-center gap-1'>
					<Clock className='size-5 fill-content' variant='Bulk' />
					<span>زمان مطالعه:</span>
					<span>5 دقیقه</span>
				</div>
			</div>
			<h1 className='text-5xl font-extrabold leading-20 mt-5'>
				تفاوت JavaScript و ECMAScript چیست؟ | رازی که به دنبالش بودی!!
			</h1>
		</div>
	)
}
