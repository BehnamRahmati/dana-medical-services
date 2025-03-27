import Section from '../ui/section'
import HomeCategoriesCard from './home-categories-card'

export default function HomeCategories() {
	return (
		<Section>
			<div className='grid grid-cols-2 lg:flex items-center justify-center gap-5 lg:gap-10 py-20 my-20 px-5 lg:px-0'>
				{[...new Array(4)].map((_, i) => (
					<HomeCategoriesCard key={'cat' + i} />
				))}
			</div>
		</Section>
	)
}
