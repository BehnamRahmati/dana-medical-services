import { ArrowLeft3 } from 'iconsax-react'
import Link from 'next/link'

export default function HomeServicesCard() {
	return (
		<div className='bg-accent border border-border rounded-xl mt-12'>
			<div className='bg-primary/60 w-11/12 rounded-xl h-44 mx-auto -mt-12 overflow-hidden flex items-center justify-center'>
				{/* <Image size='50' className='fill-content' variant='Bulk' /> */}
				{/* <Image alt='image' src={sampleImage} width={300} height={300} className='size-full rounded-xl' /> */}
			</div>
			<div className='info w-11/12 mx-auto'>
				<p className='text-secondary text-sm mt-2'>زیبایی در منزل</p>
				<Link
					href='/'
					className='text-2xl font-extrabold text-slate-700 mt-2 mb-4 transition-colors duration-200 hover:text-primary/80 block'
				>
					تست کرونا در منزل
				</Link>
				<p className='text-sm font-light text-slate-400 line-clamp-3'>
					فیزیوتراپی در منزل علمی است که نه تنها در بهبود کیفیت زندگی افراد نقش دارد، بلکه میتواند از ایجاد آسیب هم
					پیشگیری کند. هم بخشی از سیستم توانبخشی است و هم در مراقبت های حاد نقش دارد.
				</p>
			</div>
			<Link
				href={'/'}
				className='mt-5 text-center py-3 border-t border-t-border text-primary flex items-center justify-center transition-colors duration-200 hover:bg-primary/10'
			>
				<span className='text-lg font-bold'>مشاهده</span>
				<ArrowLeft3 size={25} className='fill-primary inline-block' variant='Bulk' />
			</Link>
		</div>
	)
}
