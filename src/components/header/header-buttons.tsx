'use client'
import { Chart2, LoginCurve, ProfileAdd } from 'iconsax-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import ToggleThemeButton from '../toggle-theme-button'
import { Skeleton } from '../ui/skeleton'
export default function HeaderButtons() {
	const { data: session, status } = useSession()
	const renderAuthButtons = () => {
		return (
			<div className='flex'>
				<Link
					href={'/login'}
					className='bg-primary/20 text-sm text-primary hover:bg-primary/60 hover:text-white py-1 px-2.5 inline-flex gap-2 items-center -ml-2 pl-4  rounded-lg rounded-l-none'
				>
					<span className='inline'>ورود</span>
					<LoginCurve size='25' className='fill-primary' variant='Bulk' />
				</Link>
				<Link
					href={'/register'}
					className='bg-primary/90 text-sm hover:bg-primary/60 text-white py-2 px-2.5 inline-flex gap-2 items-center rounded-lg'
				>
					<span>عضویت</span>
					<ProfileAdd size='25' className='fill-white' variant='Bulk' />
				</Link>
			</div>
		)
	}

	const renderProfileButton = () => {
		if (status === 'loading')
			return (
				<div className='flex items-center gap-2'>
					<Skeleton className='size-9 h-10 w-32bg-muted' />
				</div>
			)
		return (
			<div className='flex items-center gap-2'>
				<Link
					href='/profile'
					className='bg-primary/20 text-sm text-primary hover:bg-primary/60 hover:text-white py-2 px-2.5 flex items-center gap-2 rounded-lg'
				>
					<Image
						src={session?.user?.image || '/default-profile.png'}
						alt={session?.user?.name || 'پروفایل'}
						width={30}
						height={30}
						className='size-5 rounded-md'
					/>
					<h3 className='text-sm font-medium -mb-1'>{session?.user?.name}</h3>
				</Link>
				{(session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPERADMIN') && (
					<Link
						href={'/dashboard'}
						className='bg-secondary/20 text-sm text-secondary hover:bg-secondary/60 hover:text-white py-2 px-2.5 inline-flex gap-2 items-center rounded-lg'
					>
						<span className='hidden lg:block'>پنل مدیریت</span>
						<Chart2 className='fill-secondary size-5' variant='Bulk' />
					</Link>
				)}
			</div>
		)
	}
	return (
		<div className='flex justify-between lg:justify-start gap-2.5 w-full'>
			<ToggleThemeButton />
			{status === 'unauthenticated' ? renderAuthButtons() : renderProfileButton()}
		</div>
	)
}
