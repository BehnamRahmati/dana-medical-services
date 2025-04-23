import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TUser } from '@/lib/types'
import { ArrowLeft3 } from 'iconsax-react'
import Button from '../ui/button'
import { H4, Paragraph } from '../ui/typography'
export default function ExpertsCard({ user }: { user: TUser }) {
	return (
		<div className='border rounded-2xl border-border p-4 lg:p-8 hover:bg-accent hover:shadow-lg transition-all duration-500'>
			<div className=''>
				<Avatar className='size-28 border border-border mx-auto'>
					<AvatarImage src={user.image} alt={user.name} className='size-full rounded-full' />
					<AvatarFallback>{user.name}</AvatarFallback>
				</Avatar>
				<H4 className='text-center text-secondary mt-5'>{user.name}</H4>
			</div>
			<div className='py-10 px-5'>
				<Paragraph className='text-center'>
					دنا مجموعه ارائه‌ دهنده خدمات سلامت در منزل و محل کار است. دنا یک «آزمایشگاه» یا «مرکز درمانی» نیست بلکه تلاش
					می‌کند تا از طریق اتصال کاربران به آزمایشگاه‌های معتبر، پرستاران کارآزموده و پزشکان متخصص، انجام خدمات سلامت
					در محل را برای کاربران تسهیل نماید.
				</Paragraph>
			</div>
			<div>
				<Button variant={'ghost'} className='text-secondary w-full p-0'>
					<span> مشاهده پروفایل </span>
					<ArrowLeft3 className='size-6 fill-secondary' variant='Bulk' />
				</Button>
			</div>
		</div>
	)
}
