'use client'
import { useIsMobile } from '@/hooks/use-mobile'
import Logo from '../logo'
import NoHeaderFooterAuthentication from '../NoHeaderFooterAuthentication'
import HeaderButtons from './header-buttons'
import HeaderLinks from './header-links'
import HeaderResponsive from './header-responsive'
import HeaderSearchForm from './header-search-form'

function Header() {
	const isMobile = useIsMobile()
	return (
		<NoHeaderFooterAuthentication>
			{isMobile ? (
				<HeaderResponsive />
			) : (
				<header>
					<div className='container mx-auto hidden lg:block'>
						<div className='flex flex-col px-2.5 lg:px-5'>
							<div className='header-top bg-accent rounded-xl mt-2.5 p-4 lg:p-9.5 shadow-xs w-full flex flex-row items-center justify-between'>
								<Logo />
								<HeaderSearchForm />
								<HeaderButtons />
							</div>
							<div>
								<HeaderLinks />
							</div>
						</div>
					</div>
				</header>
			)}
		</NoHeaderFooterAuthentication>
	)
}

export default Header
