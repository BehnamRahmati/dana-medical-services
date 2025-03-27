import { LoginCurve, ProfileAdd } from 'iconsax-react'
import Link from 'next/link'
import ToggleThemeButton from '../toggle-theme-button'

export default function HeaderButtons() {
	return (
		<div className='flex gap-5'>
			<div className='hidden lg:block'>
				<ToggleThemeButton />
			</div>

			<div className='flex'>
				<Link
					href={'/login'}
					className='bg-primary/20 text-sm text-primary hover:bg-primary/60 hover:text-white py-2.5 lg:py-1 px-2.5 inline-flex gap-2 items-center md:-ml-2 md:pl-4  rounded-lg md:rounded-l-none'
				>
					<span className='hidden md:inline'>ورود</span>
					<LoginCurve size='25' className='fill-primary' variant='Bulk' />
				</Link>
				<Link
					href={'/register'}
					className='bg-primary/90 text-sm hover:bg-primary/60 text-white py-2 px-2.5 hidden md:inline-flex gap-2 items-center rounded-lg'
				>
					<span>عضویت</span>
					<ProfileAdd size='25' className='fill-white' variant='Bulk' />
				</Link>
			</div>
		</div>
	)
}
