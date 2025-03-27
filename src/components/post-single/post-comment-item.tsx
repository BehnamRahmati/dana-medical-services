import { HeartAdd } from 'iconsax-react'
import Link from 'next/link'

export default function PostCommentItem() {
	return (
		<li className='border border-border rounded-xl px-5'>
			<div className='py-5 border-b border-b-border flex justify-between'>
				<div className='flex items-center gap-2'>
					<div className='bg-content size-14 rounded-full'></div>
					<div className=''>
						<p className='font-bold text-xl'>سید حسین شهابی</p>
						<p>5 ماه پیش</p>
					</div>
				</div>
				<div className=''>
					<Link href='/' className='bg-red-500/20 py-1 px-2.5 rounded-sm flex items-center gap-1'>
						<HeartAdd className='size-6 stroke-red-500' variant='TwoTone' />
						<span className='mt-1 text-lg text-red-500'>2</span>
					</Link>
				</div>
			</div>
			<div className='py-5'>
				<div className='py-5'>مرسی. مفید بود واقعا. 🙏</div>
			</div>
		</li>
	)
}
