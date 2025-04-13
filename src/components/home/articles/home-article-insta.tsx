import { ArrowLeft3 } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import instagramImage from '../../../../public/static/index_instagram_phone_2.png'

export default function HomeArticlesInsta() {
	return (
		<div className='mt-44 lg:mt-72 flex flex-col lg:flex-row gap-10 rounded-2xl bg-gradient-to-l from-primary to-secondary items-center  justify-between py-10 lg:py-0'>
			<Image
				src={instagramImage}
				alt='dcf'
				height={300}
				width={250}
				className='h-56 lg:h-72 w-fit z-10 -mt-22 lg:-mt-32 mx-auto md:mx-0'
			/>
			<p className='text-2xl font-extrabold text-white text-center px-2.5 lg:px-0'>
				ما هر روز مطالب جدیدی در اینستگرام منتشر میکنیم!
			</p>
			<Link
				href='/'
				className='flex items-center justify-center gap-2 bg-white py-2.5 px-5  rounded-lg mx-10 group hover:bg-transparent border border-white'
			>
				<span className='text-secondary group-hover:text-white'>مشاهده پست های اینستگرام</span>
				<ArrowLeft3 size='32' className='fill-secondary group-hover:fill-white' variant='Bulk' />
			</Link>
		</div>
	)
}
