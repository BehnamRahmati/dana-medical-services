import { H3 } from '../ui/typography'
import ExpertsCard from './experts-card'

export default function ExpertsList() {
	return (
		<div>
			<H3>لیست متخصصان دنا</H3>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-16 mt-10'>
				{[...new Array(6)].map((_, i) => (
					<ExpertsCard key={'exprt' + i} />
				))}
			</div>
		</div>
	)
}
