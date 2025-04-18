'use client'
import { dataFetcher } from '@/lib/helpers'
import { TArticle, TTag } from '@/lib/types'
import { Cards } from 'iconsax-react'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { Skeleton } from '../../ui/skeleton'
import PostSidebarRelatedCard from './post-sidebar-related-card'

export default function PostSidebarRelated({ tags }: { tags: TTag[] }) {
	const tagsParam = tags.map(tag => tag.slug).join(',')
	const slug = useParams()?.slug
	const { data, isLoading, error } = useSWR<{ articles: TArticle[] }>(
		slug ? [`/api/articles/${slug}/related?tags=${tagsParam}`, 'article-related'] : null,
		dataFetcher,
	)

	if (isLoading)
		return (
			<div className=''>
				<div className='flex gap-2'>
					<Cards className='fill-content size-5' variant='Bulk' />
					<div className=''>
						<h3 className='text-lg font-bold'>مقالات مرتبط</h3>
						<p className='text-xs'>شما میتوانید مقالات مرتبط با این مقاله را اینجا مشاهده کنید.</p>
					</div>
				</div>
				<div className='flex flex-col gap-5 my-5'>
					<Skeleton className='h-14 w-full bg-content/10' />
					<Skeleton className='h-14 w-full bg-content/10' />
					<Skeleton className='h-14 w-full bg-content/10' />
					<Skeleton className='h-14 w-full bg-content/10' />
				</div>
			</div>
		)

	if (error) {
		return (
			<div className=''>
				<div className='flex gap-2'>
					<Cards className='fill-content size-5' variant='Bulk' />
					<div className=''>
						<h3 className='text-lg font-bold'>مقالات مرتبط</h3>
						<p className='text-xs'>شما میتوانید مقالات مرتبط با این مقاله را اینجا مشاهده کنید.</p>
					</div>
				</div>
				<div className='flex flex-col gap-5 my-5'>مشکلی در دریافت اطلاعات از سرور رخ داده است.</div>
			</div>
		)
	}

	if (!data) {
		return (
			<div className=''>
				<div className='flex gap-2'>
					<Cards className='fill-content size-5' variant='Bulk' />
					<div className=''>
						<h3 className='text-lg font-bold'>مقالات مرتبط</h3>
						<p className='text-xs'>شما میتوانید مقالات مرتبط با این مقاله را اینجا مشاهده کنید.</p>
					</div>
				</div>
				<div className='flex flex-col gap-5 my-5'>هیچ مقاله‌ای وجود ندارد.</div>
			</div>
		)
	}

	return (
		<div className='border border-border rounded-xl p-5 mb-5'>
			<div className='flex gap-2'>
				<Cards className='fill-content size-5' variant='Bulk' />
				<div className=''>
					<h3 className='text-lg font-bold'>مقالات مرتبط</h3>
					<p className='text-xs'>شما میتوانید مقالات مرتبط با این مقاله را اینجا مشاهده کنید.</p>
				</div>
			</div>
			<ul className='flex flex-col mt-5 gap-2'>
				{data.articles.map(article => (
					<li key={'related' + article.id}>
						<PostSidebarRelatedCard slug={article.slug} title={article.title} />
					</li>
				))}
			</ul>
		</div>
	)
}
