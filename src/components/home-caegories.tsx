import { FaUserNurse } from 'react-icons/fa6'
import Section from './ui/section'
import Title from './ui/title'

export default function HomeCategories() {
	return (
		<Section>
			<div className='flex flex-row'>
				<Title>دسته بندی</Title>
			</div>
			<div className='flex items-center justify-center gap-10 py-10'>
				{[...new Array(4)].map((_, i) => (
					<div
						key={'cat' + i}
						className='bg-accent border border-slate-200 rounded-xl shadowm-sm size-52 flex items-center justify-center'
					>
						<FaUserNurse size={65} />
					</div>
				))}
			</div>
		</Section>
	)
}
