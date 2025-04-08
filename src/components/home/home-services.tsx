import Section from '../ui/section'
import Title from '../ui/title'
import HomeMoreLink from './home-more-link'
import LandingServices from './services/landing-services'

export default function HomeServices() {
	return (
		<Section>
			<div className='flex flex-row justify-between items-center mt-20'>
				<Title>خدمات</Title>
				<HomeMoreLink>مشاهده همه خدمات</HomeMoreLink>
			</div>
			<LandingServices />
		</Section>
	)
}
