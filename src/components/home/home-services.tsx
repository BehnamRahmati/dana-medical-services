import Section from '../ui/section'
import Title from '../ui/title'
import HomeMoreLink from './home-more-link'
import LandingServices from './services/landing-services'

export default function HomeServices() {
	return (
		<Section className='lg:px-5'>
			<div className='flex flex-col md:flex-row justify-between items-center gap-10 mt-20 px-5 lg:px-0'>
				<Title>خدمات</Title>
				<HomeMoreLink>مشاهده همه خدمات</HomeMoreLink>
			</div>
			<LandingServices />
		</Section>
	)
}
