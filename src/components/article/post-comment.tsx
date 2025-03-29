import { ArrowLeft3, Profile } from 'iconsax-react'
import Link from 'next/link'
import PostCommentItem from './post-comment-item'

export default function PostComment() {
	return (
		<div className='bg-accent border border-border p-5 lg:p-10 rounded-xl mt-10'>
			<h2 className='text-3xl font-extrabold'>دیدگاه و پرسش</h2>
			<div className='bg-secondary rounded-lg py-5 px-10 mt-10 flex flex-col md:flex-row gap-5 items-center justify-between'>
				<div className=' flex items-center gap-1'>
					<Profile className='fill-white size-8' variant='Bulk' />
					<p className='text-white text-xl mt-1'>برای ارسال دیدگاه لازم است وارد شده یا ثبت‌نام کنید</p>
				</div>
				<Link href='/' className='text-white text-xl flex items-center gap-2'>
					<span className='underline underline-offset-2 mt-1'>ورود یا ثبت نام</span>
					<ArrowLeft3 className='fill-white size-7' variant='Bulk' />
				</Link>
			</div>

			{/* * coments list */}
			<ul className='flex flex-col gap-10 mt-10'>
				{[...new Array(5)].map((_, i) => (
					<PostCommentItem key={'cmt' + i} />
				))}
			</ul>
		</div>
	)
}
