'use client'
import { Instagram, KeySquare, ProfileAdd } from 'iconsax-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaLinkedin, FaYahoo } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'

export default function AuthnticationPage({
	children,
	title,
	subtitle,
}: {
	children: React.ReactNode
	title: string
	subtitle: string
}) {
	const patthname = usePathname()
	const isLogin = patthname === '/login'
	const isRegister = patthname === '/register'
	return (
		<div className='container mx-auto min-h-dvh grid place-content-center py-20'>
			<Link href='/' className='flex items-end gap-2 mb-10 w-fit mx-auto'>
				<span className='text-lg'>خدمات پزشکی</span>
				<span className='text-7xl font-extrabold leading-7 text-primary'>دنــا .</span>
			</Link>
			<div className='bg-accent/60 rounded-xl border border-border p-10 shadow-2xl'>
				<div className='flex items-center mb-10 mx-auto w-fit'>
					<Link
						href='/register'
						className={`py-2.5 px-5 rounded-lg ${isRegister ? 'bg-primary text-white' : 'text-primary'}`}
					>
						<ProfileAdd
							className={`size-6 inline-block ml-2 ${isRegister ? 'fill-white' : 'fill-primary'}`}
							variant='Bulk'
						/>
						ثبت نام
					</Link>
					<Link
						href='/login'
						className={`py-2.5 px-5 rounded-lg ${isLogin ? 'bg-primary text-white' : 'text-primary'}`}
					>
						<KeySquare
							className={`size-6 inline-block ml-2 ${isLogin ? 'fill-white' : 'fill-primary'}`}
							variant='Bulk'
						/>
						ورود
					</Link>
				</div>
				<div className='mb-10 *:text-center'>
					<h2 className='text-4xl font-bold'> {title}</h2>
					<p className='text-sm text-content/60 mt-2'>{subtitle} </p>
				</div>
				<div className='grid grid-cols-2 gap-5 *:w-56 *:cursor-pointer'>
					<button type='button' onClick={() => signIn('google')} className='bg-accent rounded-lg p-4 flex items-center'>
						<FcGoogle className='text-2xl inline-block ml-2' />
						<span>ورود یا ثیت نام با گوگل</span>
					</button>
					<button type='button' className='bg-accent rounded-lg p-4 flex items-center'>
						<FaYahoo className='text-2xl inline-block text-purple-700 ml-2' />
						<span>ورود یا ثیت نام با یاهو</span>
					</button>
					<button type='button' className='bg-accent rounded-lg p-4 flex items-center'>
						<Instagram className='size-6 fill-pink-500 inline-block ml-2' variant='Bulk' />
						<span>ورود یا ثیت نام با اینستگرام</span>
					</button>
					<button type='button' className='bg-accent rounded-lg p-4 flex items-center'>
						<FaLinkedin className='text-2xl inline-block text-sky-500 ml-2' />
						<span>ورود یا ثیت نام با لینکداین</span>
					</button>
				</div>
				{children}
			</div>
		</div>
	)
}
