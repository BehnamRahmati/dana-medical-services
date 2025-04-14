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
			<div className='flex flex-col items-center justify-center gap-5'>
				<div className='size-56 bg-secondary rounded-4xl'>
					<Image src={image} alt={name} className='rounded-4xl size-full' width={110} height={110} />
				</div>
				<div className=''>
					<h2 className='text-5xl font-semibold mb-5 text-center'>{name}</h2>
					<p className='text-xl text-center mt-2.5'>{email}</p>
				</div>
				<div className='flex gap-5 my-5'>
					<Button variant={'secondary'}>ویرایش اطلاعات</Button>
					<Button variant={'destructive'} className='' onClick={() => signOut({ callbackUrl: '/' })}>
						خروج
					</Button>
				</div>
				<ul className='flex flex-col md:flex-row items-center gap-5 '>
					{statics.map((item, index) => {
						return (
							<li key={index} className='flex flex-col items-center gap-1 min-w-32'>
								<span className='text-sm font-semibold'>{item.title}</span>
								<span className='text-3xl font-bold'>{item.value}</span>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}
