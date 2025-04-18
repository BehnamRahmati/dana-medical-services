import placeholderImg from '@/assets/user-placeholder.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft3 } from 'iconsax-react'
import Button from '../ui/button'
import { H4, Paragraph } from '../ui/typography'
export default function ExpertsCard() {
	return (
		<div className='border rounded-2xl border-border p-4 lg:p-8 hover:bg-accent hover:shadow-lg transition-all duration-500'>
			<div className=''>
				<Avatar className='size-28 border border-border mx-auto'>
					<AvatarImage src={placeholderImg.src} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<H4 className='text-center text-secondary mt-5'>سید شهاب حسینی</H4>
			</div>
			<div className='py-10 px-5'>
				<Paragraph className='text-center'>
					بیشتر از ۱۵ سال هست که در حال برنامه‌نویسی و انجام پروژه های مختلف هستم و ۱۰ سالی هست که آموزش برنامه‌نویسی به
					علاقمندان حوزه برنامه نویسی میدیم در همه این مدت الان عاشق کدزنی و چالش‌های پروژه‌های مختلفم. به تدریس علاقه
					خاصی دارم و دوست دارم دانشی که در این راه بدست آوردم را در اختیار دیگران هم قرار بدم.
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
