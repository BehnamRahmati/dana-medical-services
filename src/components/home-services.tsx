import Image from 'next/image'
import Link from 'next/link'
import { LuSquareArrowOutUpLeft } from 'react-icons/lu'
import sampleImage from '../../public/static/clinic-banner.jpg'
import Section from './ui/section'
import Title from './ui/title'
export default function HomeServices() {
	return (
		<Section>
			<div className='flex flex-row justify-between items-center '>
				<Title>خدمات</Title>
				<Link href='/' className='text-2xl text-slate-500 flex items-center gap-2'>
					مشاهده همه خدمات
					<LuSquareArrowOutUpLeft />
				</Link>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-10 py-10'>
				{[...new Array(8)].map((_, i) => (
					<div className='bg-accent border border-slate-200 rounded-xl mt-12' key={'sers' + i}>
						<div className='bg-primary w-11/12 rounded-xl h-44 mx-auto -mt-12 overflow-hidden'>
							<Image alt='image' src={sampleImage} width={300} height={300} className='size-full rounded-xl' />
						</div>
						<div className='info w-11/12 mx-auto'>
							<p className='text-secondary text-sm font-bold mt-2'>زیبایی در منزل</p>
							<h3 className='text-2xl font-extrabold text-slate-700 mt-2 mb-4'>تست کرونا در منزل</h3>
							<p className='text-sm font-light text-slate-400'>
								فیزیوتراپی در منزل علمی است که نه تنها در بهبود کیفیت زندگی افراد نقش دارد، بلکه میتواند از ایجاد
								آسیب هم پیشگیری کند. هم بخشی از سیستم توانبخشی است و هم در مراقبت های حاد نقش دارد.
							</p>
						</div>
						<div className='mt-4 text-center py-4 border-t border-t-slate-300 text-lg font-bold'>
							مشاهده اطلاعات بیشتر
						</div>
					</div>
				))}
			</div>
		</Section>
	)
}
