import NoHeaderFooterAuthentication from '../NoHeaderFooterAuthentication'
import FooterAbout from './footer-about'
import FooterContact from './footer-contact'
import FooterFooter from './footer-footer'
import FooterHeader from './footer-header'
import FooterQuickAccess from './footer-quick-access'
import FooterTopServices from './footer-top-services'

function Footer() {
	return (
		<NoHeaderFooterAuthentication>
			<footer className='px-5'>
				<FooterHeader />
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 py-10 container mx-auto'>
					<FooterAbout />

					<FooterQuickAccess />

					<FooterTopServices />

					<FooterContact />
				</div>
				<FooterFooter />
			</footer>
		</NoHeaderFooterAuthentication>
	)
}

export default Footer
