import { ArrowLeft3 } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import instagramImage from '../../../public/static/index_instagram_phone_2.png'
import PostCard from '../ui/post-card'
import Section from '../ui/section'
import Title from '../ui/title'
import HomeMoreLink from './home-more-link'

export default function HomeLatestPosts() {
	return (
		<Section>
			<div className='flex flex-col lg:flex-row gap-10 bg-content/10 py-20 my-20 lg:my-52 px-5 md:px-10 rounded-xl relative'>
				<div className='flex flex-col lg:w-1/3 gap-10'>
					<Title>آخرین مقالات</Title>
					<p className='text-content'>
						نوشتن کار جالبیه که از هزاران سال همراه ما بوده و کمک کرده تا همیشه به روز باشیم، ما در راکت فضای رو به
						شکلی آماده کردیم تا شما بتونید ایده‌ها و مطالب جالب حوزه برنامه‌نویسی رو در اختیار هزاران برنامه‌نویس عضو
						راکت قرار بدید.
					</p>
					<HomeMoreLink className='border border-border lg:w-fit px-5 py-2 rounded-lg hover:border-primary justify-center'>
						مشاهده همه مقالات
					</HomeMoreLink>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-1/2 lg:absolute lg:-top-1/2 lg:left-10 '>
					<div className='grid grid-cols-1 gap-6'>
						{[...new Array(2)].map((_, i) => (
							<PostCard key={'post' + i} />
						))}
					</div>
					<div className='grid grid-cols-1 gap-6 lg:transform lg:translate-y-10'>
						{[...new Array(2)].map((_, i) => (
							<PostCard key={'pst' + i} />
						))}
					</div>
				</div>
			</div>

			<div className='mt-44 lg:mt-72 flex flex-col lg:flex-row gap-10 rounded-2xl bg-gradient-to-l from-primary to-secondary items-center  justify-between py-10 lg:py-0'>
				<Image
					src={instagramImage}
					alt='dcf'
					height={300}
					width={250}
					className='h-56 lg:h-72 w-fit z-10 -mt-22 lg:-mt-32 mx-auto md:mx-0'
				/>
				<p className='text-2xl font-extrabold text-white text-center'>ما هر روز مطالب جدیدی در اینستگرام منتشر میکنیم!</p>
				<Link
					href='/'
					className='flex items-center justify-center gap-2 bg-white py-2.5 px-5  rounded-lg mx-10 group hover:bg-transparent border border-white'
				>
					<span className='text-secondary group-hover:text-white'>مشاهده پست های اینستگرام</span>
					<ArrowLeft3 size='32' className='fill-secondary group-hover:fill-white' variant='Bulk' />
				</Link>
			</div>
		</Section>
	)
}
