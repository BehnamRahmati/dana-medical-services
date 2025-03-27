import { HambergerMenu } from 'iconsax-react'
import Logo from '../logo'
import HeaderButtons from './header-buttons'
import HeaderLinks from './header-links'
import HeaderSearchForm from './header-search-form'

function Header() {
	return (
		<header>
			<div className='container mx-auto '>
				<div className='flex flex-col px-2.5 lg:px-0'>
					<div className='header-top bg-accent rounded-xl mt-2.5 p-4 lg:p-9.5 shadow-xs w-full flex flex-row items-center justify-between'>
						<div className='lg:hidden'>
							<HambergerMenu size='45' className='fill-content' variant='Bulk' />
						</div>
						<Logo />
						<HeaderSearchForm />
						<HeaderButtons />
					</div>
					<div className='hidden lg:block'>
						<HeaderLinks />
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
