import { ArrowLeft3, Briefcase, I24Support, Map, Profile2User } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import bannerImage from '../../../public/static/Doctors-bro.png'
import curlyArrow from '../../../public/static/curly-arrow.svg'
import Section from '../ui/section'
export default function Homebanner() {
	return (
		<Section>
			<div className='relative flex flex-col-reverse lg:flex-row items-center justify-between lg:px-5 '>
				<div className='info lg:w-1/2 px-5 lg:px-0'>
					<div className='flex flex-col lg:block items-center justify-center'>
						<h2 className='text-5xl lg:text-7xl text-center lg:text-start font-extrabold leading-28 text-primary'>
							خدمات پزشکی دنا
						</h2>
						<p className='text-2xl text-center lg:text-start leading-12 text-content/60'>
							انجام انواع خدمات پزشکی در منزل و محل کار توسط پرسنل دنا
						</p>
						<Link
							href='#request-service'
							className='flex items-center gap-2 py-3 px-5 bg-primary w-fit text-white font-bold text-xl rounded-lg mt-5 hover:bg-primary/80 transition-colors duration-200'
						>
							<span>ثبت درخواست خدمات</span>
							<ArrowLeft3 size='32' className='fill-white' variant='Bulk' />
						</Link>
					</div>

					<ul className='grid grid-cols-1 md:grid-cols-2 gap-10 *:flex *:items-center *:gap-2 *:text-xl  *:font-bold w-fit my-20'>
						<li>
							<div className='flex flex-col'>
								<Briefcase size='27' className='fill-red-400' variant='Bulk' />
								<span className='size-6 bg-red-400/20 rounded-lg -mt-5 -mr-1'></span>
							</div>

							<span>با بیش از 10 سال سابقه</span>
						</li>
						<li>
							<div className='flex flex-col'>
								<Profile2User size='27' className='fill-secondary' variant='Bulk' />
								<span className='size-6 bg-secondary/20 rounded-lg -mt-5 -mr-1'></span>
							</div>

							<span>همراه با پرسنل مجرب</span>
						</li>
						<li>
							<div className='flex flex-col'>
								<I24Support size='27' className='fill-primary' variant='Bulk' />
								<span className='size-6 bg-primary/20 rounded-lg -mt-5 -mr-1'></span>
							</div>

							<span>پشتیبانی 24 ساعته</span>
						</li>

						<li>
							<div className='flex flex-col'>
								<Map size='27' className='fill-amber-400' variant='Bulk' />
								<span className='size-6 bg-amber-400/20 rounded-lg -mt-5 -mr-1'></span>
							</div>

							<span>خدمات رسانی در تهران</span>
						</li>
					</ul>
				</div>
				<div className='image md:w-1/2'>
					<Image src={bannerImage} width={500} height={300} alt='banner' className='size-full' />
				</div>
				<div className='absolute top-11/12 lg:top-10/12 left-1/12 lg:left-1/2 block size-32 transform rotate-90'>
					<Image src={curlyArrow} width={500} height={300} alt='banner' className='size-full' />
				</div>
			</div>
		</Section>
	)
}
