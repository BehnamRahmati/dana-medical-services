import Image from 'next/image'
import Link from 'next/link'
import { LuSquareArrowOutUpLeft } from 'react-icons/lu'
import { PiBookmarkSimpleDuotone, PiHeartDuotone } from 'react-icons/pi'
import { TbMessage2 } from 'react-icons/tb'
import instagramImage from '../../public/static/index_instagram_phone_2.png'
import Section from './ui/section'
import Title from './ui/title'
export default function HomeLatestPosts() {
	return (
		<Section>
			<div className='flex flex-row gap-10 bg-slate-200 py-20 my-20 px-10 rounded-xl relative'>
				<div className='flex flex-col w-1/3 gap-10'>
					<Title>آخرین مقالات</Title>
					<p>
						نوشتن کار جالبیه که از هزاران سال همراه ما بوده و کمک کرده تا همیشه به روز باشیم، ما در راکت فضای رو به
						شکلی آماده کردیم تا شما بتونید ایده‌ها و مطالب جالب حوزه برنامه‌نویسی رو در اختیار هزاران برنامه‌نویس عضو
						راکت قرار بدید.
					</p>
					<Link href='/' className='text-2xl text-slate-500 flex items-center gap-2'>
						مشاهده همه مقالات
						<LuSquareArrowOutUpLeft />
					</Link>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-1/2 absolute -top-1/2 left-10 '>
					<div className='grid grid-cols-1'>
						{[...new Array(2)].map((_, i) => (
							<div
								key={'posts' + i}
								className='w-full bg-white min-h-32 p-5 rounded-xl border border-slate-300 mb-6'
							>
								<div className='bg-slate-400 w-full h-52 rounded-xl'></div>
								<h3 className='text-xl mt-2 font-extrabold'>جشنواره نوروزی راکت! - بزرگترین تخفیف‌های سال!</h3>
								<div className='flex items-center justify-between mt-5'>
									<div className='flex items-center gap-2'>
										<div className='size-7 bg-slate-500 rounded-full'></div>
										<p className='text-sm font-bold text-slate-400'>سید شهاب حسینی</p>
									</div>
									<div className='bg-primary/20 px-2.5 py-1 rounded-lg text-sm text-primary'>زیبایی</div>
								</div>

								<div className='flex items-center justify-between mt-4'>
									<ul className='flex gap-2.5 items-center'>
										<li className='text-secondary bg-secondary/20 p-1 rounded-sm flex items-center'>
											<PiBookmarkSimpleDuotone />
											<span className='text-xs mr-1 -mb-1'>12</span>
										</li>
										<li className='text-red-500 bg-red-500/20 p-1 rounded-sm flex items-center'>
											<PiHeartDuotone />
											<span className='text-xs mr-1 -mb-1'>12</span>
										</li>
										<li className='text-primary bg-primary/20 p-1 rounded-sm flex items-center'>
											<TbMessage2 />
											<span className='text-xs mr-1 -mb-1'>12</span>
										</li>
									</ul>
									<p className='text-sm text-slate-400'>
										<span>زمان مطالعه :</span>
										<span>11 دقیقه</span>
									</p>
								</div>
							</div>
						))}
					</div>
					<div className='grid grid-cols-1 mt-14'>
						{[...new Array(2)].map((_, i) => (
							<div
								key={'pst' + i}
								className='w-full bg-white min-h-32 p-5 rounded-xl border border-slate-300 first:mb-6'
							>
								<div className='bg-slate-400 w-full h-52 rounded-xl'></div>
								<h3 className='text-xl mt-2 font-extrabold'>جشنواره نوروزی راکت! - بزرگترین تخفیف‌های سال!</h3>
								<div className='flex items-center justify-between mt-5'>
									<div className='flex items-center gap-2'>
										<div className='size-7 bg-slate-500 rounded-full'></div>
										<p className='text-sm font-bold text-slate-400'>سید شهاب حسینی</p>
									</div>
									<div className='bg-primary/20 px-2.5 py-1 rounded-lg text-sm text-primary'>زیبایی</div>
								</div>
								<div className='flex items-center justify-between mt-4'>
									<ul className='flex gap-2.5 items-center'>
										<li className='text-secondary bg-secondary/20 p-1 rounded-sm flex items-center'>
											<PiBookmarkSimpleDuotone />
											<span className='text-xs mr-1 -mb-1'>12</span>
										</li>
										<li className='text-red-500 bg-red-500/20 p-1 rounded-sm flex items-center'>
											<PiHeartDuotone />
											<span className='text-xs mr-1 -mb-1'>12</span>
										</li>
										<li className='text-primary bg-primary/20 p-1 rounded-sm flex items-center'>
											<TbMessage2 />
											<span className='text-xs mr-1 -mb-1'>12</span>
										</li>
									</ul>
									<p className='text-sm text-slate-400'>
										<span>زمان مطالعه :</span>
										<span>11 دقیقه</span>
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='mt-52'>
				<Image src={instagramImage} alt='dcf' height={300} width={250} className='h-72 w-auto' />
				<div className='rounded-xl bg-gradient-to-l from-primary to-secondary w-full h-44 -mt-44'></div>
			</div>
		</Section>
	)
}
