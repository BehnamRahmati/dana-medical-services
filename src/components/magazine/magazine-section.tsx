'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { dataFetcher } from '@/lib/helpers'
import { TArticle } from '@/lib/types'
import Link from 'next/link'
import useSWR from 'swr'
import { Skeleton } from '../ui/skeleton'
import MagazineCard from './magazine-card'

export default function MagazineSection({ categorySlug, title }: { categorySlug: string; title: string }) {
	const shouldFetch = categorySlug
	const { data, isLoading, error } = useSWR<{ articles: TArticle[] }>(
		shouldFetch ? ['/api/articles?category=' + categorySlug, 'magazine-articles'] : null,
		dataFetcher,
	)
	if (isLoading) return <SectionSkeleton />
	if (error) return <p>خطا در بارگذاری مقالات</p>
	if (!data) return <p>مقالات یافت نشد</p>

	return (
		<div className='container mx-auto px-2.5 lg:px-5 py-5 lg:py-10 2xl:py-15'>
			<Carousel
				opts={{
					dragFree: true,
					direction: 'rtl',
				}}
				className='border border-border p-2.5 rounded-2xl bg-accent'
			>
				<CarouselContent className='-ml-2.5'>
					<CarouselItem className='basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2.5'>
						<div className='shrink-0 flex flex-col items-center justify-center h-full'>
							<Link
								href={`/articles/`}
								className='flex flex-col items-center justify-center px-2.5 text-base lg:text-lg'
							>
								<p>مشاهده همه ی مقالات</p>
								<h3 className='text-2xl lg:text-4xl font-black text-secondary'>{title}</h3>
							</Link>
						</div>
					</CarouselItem>

					{data.articles.map(article => (
						<CarouselItem key={article.id} className='basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2.5'>
							<MagazineCard article={article} />
						</CarouselItem>
					))}
				</CarouselContent>
				{/* <CarouselPrevious />
				<CarouselNext /> */}
			</Carousel>
		</div>
	)
}

function SectionSkeleton() {
	return (
		<div className='container mx-auto px-2.5 lg:px-5 py-5 lg:py-10 2xl:py-20'>
			<div className='border border-border rounded-2xl p-2.5 grid grid-cols-5 gap-2.5'>
				<div className=' flex flex-col items-center justify-center h-full'>
					<div className='flex flex-col items-center justify-center px-2.5 text-base lg:text-lg'>
						<Skeleton className='h-7 w-full bg-content/10 mb-2.5' />
						<Skeleton className='h-7 w-full bg-content/10' />
					</div>
				</div>
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className='bg-content/10 p-2.5 rounded-2xl'>
						<Skeleton className='h-32 lg:h-44 rounded-2xl bg-content/10 mb-2.5' />
						<Skeleton className='h-7 w-18 bg-content/10 mb-2.5' />
						<Skeleton className='h-14 w-full bg-content/10' />
					</div>
				))}
			</div>
		</div>
	)
}
