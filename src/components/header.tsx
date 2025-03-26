import Link from 'next/link'
import { PiSignInDuotone, PiUserCirclePlusDuotone } from 'react-icons/pi'
import HeaderSearchForm from './header-search-form'
import Logo from './logo'
import ToggleThemeButton from './toggle-theme-button'

function Header() {
	return (
		<header>
			<div className='container mx-auto '>
				<div className='flex flex-col'>
					<div className='header-top bg-accent rounded-xl mt-2.5 p-9.5 shadow-xs w-full flex flex-row items-center justify-between'>
						<Logo />
						<HeaderSearchForm />
						<div className='flex gap-5'>
							<ToggleThemeButton />
							<div className='flex'>
								<Link
									href={'/login'}
									className='bg-primary/20 text-sm text-primary hover:bg-primary/60 hover:text-white py-1 px-2.5 inline-flex gap-2 items-center -ml-2 pl-4 rounded-r-lg'
								>
									<span>ورود</span>
									<PiSignInDuotone className={'size-6'} />
								</Link>
								<Link
									href={'/register'}
									className='bg-primary/90 text-sm hover:bg-primary/60 text-white py-2 px-2.5 inline-flex gap-2 items-center rounded-lg'
								>
									<span>عضویت</span>
									<PiUserCirclePlusDuotone className={'size-6'} />
								</Link>
							</div>
						</div>
					</div>
					<div className='header-bottom bg-slate-300 w-11/12 mx-auto rounded-b-xl flex flex-row items-center justify-center p-2.5'>
						hello
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
