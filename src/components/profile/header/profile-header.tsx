type TProps = { likes: number; comments: number; requests: number; name: string; email: string; image: string }
import Button from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
export default function ProfileHeader({ likes, comments, requests, name, email, image }: TProps) {
	const statics = [
		{
			title: 'تعداد درخواست ها',
			value: requests,
		},
		{
			title: 'تعداد کامنت ها',
			value: comments,
		},
		{
			title: 'تعداد لایک ها',
			value: likes,
		},
	]
	return (
		<div>
			<div className='flex flex-col lg:flex-row  lg:items-stretch gap-5 -mt-36'>
				<div className='size-56 rounded-4xl mx-auto bg-accent'>
					<Image src={image} alt={name} className='rounded-4xl size-full' width={110} height={110} />
				</div>
				<div className='flex-1 bg-accent rounded-4xl'>
					<div className=' p-5 rounded-4xl flex flex-1 flex-col lg:flex-row justify-between items-center'>
						<div className='flex flex-col lg:flex-row items-center lg:gap-10'>
							<h2 className='text-5xl font-semibold  text-center'>{name}</h2>
							<p className='text-xl text-center '>{email}</p>
						</div>
						<div className='flex flex-col lg:items-end py-5 lg:py-0'>
							<div className='flex gap-5 my-5'>
								<Button variant={'secondary'}>ویرایش اطلاعات</Button>
								<Button variant={'destructive'} className='' onClick={() => signOut({ callbackUrl: '/' })}>
									خروج
								</Button>
							</div>
						</div>
					</div>
					<div className='p-5 lg:py-0'>
						<ul className='flex flex-wrap items-center gap-10 '>
							{statics.map((item, index) => {
								return (
									<li key={index} className='flex flex-col items-center gap-1'>
										<span className='text-sm font-semibold'>{item.title}</span>
										<span className='text-3xl font-bold'>{item.value}</span>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
