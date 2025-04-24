import { TArticle } from '@/lib/types'
import { ProfileCircle } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
export default function MagazineCard({ article }: { article: TArticle }) {
	return (
		<div className='flex flex-col gap-2.5 border border-border p-2.5 rounded-2xl size-full bg-background group'>
			<div className='h-32 lg:h-44 rounded-2xl w-full overflow-hidden'>
				<Image
					src={article.thumbnail}
					alt={article.title}
					className='w-full h-32 lg:h-44 rounded-2xl object-cover transform group-hover:scale-110 transition-transform duration-200 ease-in-out'
					width={200}
					height={200}
				/>
			</div>

			<Link href={`/articles?category=${article.category.slug}`} className='text-primary text-sm'>
				{article.category.name}
			</Link>
			<Link href={`/articles/${article.slug}`} className='line-clamp-2 font-bold text-lg hover:text-primary'>
				{article.title}
			</Link>
			<div className='flex gap-2.5 items-center mb-0 mt-auto'>
				<ProfileCircle className='stroke-content/60 size-5' variant='Broken' />
				<p className='text-sm'>{article.author.name}</p>
			</div>
		</div>
	)
}
