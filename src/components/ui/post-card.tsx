import { Bookmark2, Heart, MessageText1, Watch } from 'iconsax-react'

export default function PostCard() {
	return (
		<div className='w-full bg-accent min-h-32 p-5 rounded-xl border border-slate-300'>
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
						<Bookmark2 size='15' className='fill-secondary' variant='Bulk' />
						<span className='text-xs mr-1 -mb-1'>12</span>
					</li>
					<li className='text-red-500 bg-red-500/20 p-1 rounded-sm flex items-center'>
						<Heart size='15' className='fill-red-500' variant='Bulk' />
						<span className='text-xs mr-1 -mb-1'>12</span>
					</li>
					<li className='text-primary bg-primary/20 p-1 rounded-sm flex items-center'>
						<MessageText1 size='15' className='fill-primary' variant='Bulk' />
						<span className='text-xs mr-1 -mb-1'>12</span>
					</li>
				</ul>
				<p className='text-sm text-slate-400 flex items-center gap-1'>
					<Watch size='15' className='fill-content' variant='Bulk' />
					<span>زمان مطالعه :</span>
					<span>11 دقیقه</span>
				</p>
			</div>
		</div>
	)
}
