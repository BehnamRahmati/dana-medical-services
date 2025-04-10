import { TCategory } from '@/lib/types'
import axios from 'axios'
import Section from '../ui/section'
import Title from '../ui/title'
import HomeCategoriesCard from './home-categories-card'

export default async function HomeCategories() {
	const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/dashboard/services/categories`)
	const categories = response.data.categories as TCategory[]
	return (
		<Section>
			<div className='lg:gap-10 py-20 my-20 px-5 '>
				<div className='w-fit mx-auto mb-15'>
					<Title>دسته بندی خدمات</Title>
				</div>

				<div className='grid grid-cols-1 md:flex items-center justify-center gap-10 lg:gap-20 '>
					{categories && categories.map(cat => <HomeCategoriesCard category={cat} key={cat.id} />)}
				</div>
			</div>
		</Section>
	)
}
