import Section from '../ui/section'
import Title from '../ui/title'
import HomeMoreLink from './home-more-link'
import HomeServicesCard from './home-services-card'

export default function HomeServices() {
	return (
		<Section>
			<div className='flex flex-row justify-between items-center mt-20'>
				<Title>خدمات</Title>
				<HomeMoreLink>مشاهده همه خدمات</HomeMoreLink>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 px-5 lg:px-0 lg:grid-cols-4 gap-10 py-10'>
				{[...new Array(8)].map((_, i) => (
					<HomeServicesCard key={'sers' + i} />
				))}
			</div>
		</Section>
	)
}
