import Image from 'next/image'
import { FaUserDoctor } from 'react-icons/fa6'
import { LuPhoneCall } from 'react-icons/lu'
import { MdOutlineWorkHistory } from 'react-icons/md'
import { PiMapPinAreaDuotone } from 'react-icons/pi'
import bannerImage from '../../public/static/Doctors-bro.png'
import Section from './ui/section'
export default function Homebanner() {
	return (
		<Section>
			<div className='flex flex-col lg:flex-row items-center justify-between '>
				<div className='info w-1/2'>
					<h2 className='text-7xl font-extrabold leading-28 text-primary'>خدمات پزشکی دنا</h2>
					<p className='text-2xl leading-12 text-slate-600 w-2/3 mb-10'>
						انجام انواع خدمات پزشکی در منزل و محل کار توسط پرسنل دنا
					</p>
					<ul className='grid grid-cols-2 gap-5 *:flex *:items-center *:gap-2 *:text-xl *:text-slate-600 *:font-bold'>
						<li>
							<div className='flex flex-col'>
								<MdOutlineWorkHistory className='size-6 text-red-400 ' />
								<span className='size-6 bg-red-400/20 rounded-lg -mt-4 -mr-2'></span>
							</div>

							<span>با بیش از 10 سال سابقه</span>
						</li>
						<li>
							<div className='flex flex-col'>
								<FaUserDoctor className='size-6 text-secondary' />
								<span className='size-6 bg-secondary/20 rounded-lg -mt-4 -mr-2'></span>
							</div>

							<span>همراه با پرسنل مجرب</span>
						</li>
						<li>
							<div className='flex flex-col'>
								<LuPhoneCall className='size-6 text-primary' />
								<span className='size-6 bg-primary/20 rounded-lg -mt-4 -mr-2'></span>
							</div>

							<span>پشتیبانی 24 ساعته</span>
						</li>

						<li>
							<div className='flex flex-col'>
								<PiMapPinAreaDuotone className='size-6 text-amber-400' />
								<span className='size-6 bg-amber-400/20 rounded-lg -mt-4 -mr-2'></span>
							</div>

							<span>خدمات رسانی در تهران</span>
						</li>
					</ul>
				</div>
				<div className='image w-1/2'>
					<Image src={bannerImage} width={500} height={300} alt='banner' className='size-full' />
				</div>
			</div>
		</Section>
	)
}
