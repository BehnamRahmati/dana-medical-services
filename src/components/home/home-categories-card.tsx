import { TCategory } from '@/lib/types'
import Link from 'next/link'
import { H2 } from '../ui/typography'

export default function HomeCategoriesCard({ category }: { category: TCategory }) {
	return (
		<div className=' h-52 md:w-52 flex items-center justify-center *:text-center'>
			<Link href={`/services?category=${category.slug}`} className='hover:text-secondary transition-colors duration-200'>
				<H2>{category.name}</H2>
			</Link>
		</div>
	)
}
