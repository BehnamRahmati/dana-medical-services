'use client'
import useArticles from '@/hooks/use-articles'
import { fetchTags } from '@/lib/helpers'
import { Hashtag } from 'iconsax-react'
import useSWR from 'swr'

export default function ArticlesSidebar() {
	const { setAddress } = useArticles()
	const { data: tags, isLoading } = useSWR('/api/dashboard/tags', fetchTags)
	if (isLoading || !tags) return <div className=''>loading</div>

	return (
		<aside className='w-full lg:w-80'>
			<div className='border border-border rounded-lg py-10 px-5'>
				<div className='flex items-center gap-2'>
					<Hashtag className='size-10 fill-content' variant='Bulk' />
					<h3 className='text-2xl font-bold mt-2'>تگ های محبوب</h3>
				</div>
				<ul className='flex items-center flex-wrap mt-5 gap-2'>
					{tags.map(tag => (
						<li
							key={tag.id}
							className='bg-content/20 pt-1 pb-0.5 px-2.5 rounded-lg cursor-pointer'
							onClick={() => setAddress(`/api/articles?tags=${tag.slug}`)}
						>
							#{tag.name}
						</li>
					))}
				</ul>
			</div>
		</aside>
	)
}
