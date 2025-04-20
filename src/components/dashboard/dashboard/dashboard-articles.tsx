'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { Small } from '@/components/ui/typography'
import { dataFetcher } from '@/lib/helpers'
import { TArticle } from '@/lib/types'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'

export default function DashboardArticles() {
	const { data, isLoading, error } = useSWR<{ articles: TArticle[] }>(
		['/api/dashboard/articles/dashboard', 'd-articles'],
		dataFetcher,
	)
	return (
		<div className='w-full rounded-lg bg-accent p-5'>
			<div className='mb-5'>
				<h3 className='font-semibold'>مقالات اخیر</h3>
				<p className='text-muted-foreground text-xs'>مقالات اخیر را می توانید در این بخش ببینید</p>
			</div>
			<ul className='lg:flex items-center gap-5 py-5 *:text-muted-foreground *:font-semibold hidden'>
				<li className='w-4/12'>عنوان</li>
				<li className='w-3/12 flex gap-5'>
					<p className='w-2/3'>دسته بندی</p>
					<p className='w-1/3'>تاریخ ایجاد</p>
				</li>
				<li className='w-3/12 flex gap-5'>
					<p className='w-1/3'>لایک ها</p>
					<p className='w-1/3'>دیدگاه ها</p>
					<p className='w-1/3'>نشان شده</p>
				</li>
				<li className='w-2/12'>عملیات</li>
			</ul>
			<ul className='flex flex-col gap-5 w-full'>
				{isLoading && (
					<li>
						<Skeleton className='h-20 bg-muted w-full' />
					</li>
				)}
				{error && <li className='text-red-500 text-sm'>خطا در بارگذاری مقالات</li>}
				{!isLoading && !error && data && (
					<>
						{data.articles.map((article, index) => (
							<li key={index} className='flex flex-col lg:flex-row items-center gap-5 w-full'>
								<div className='flex gap-2 w-full lg:w-4/12'>
									<div className='h-10 w-16 rounded-xl bg-gray-100 shrink-0'>
										<Image
											src={article.thumbnail}
											alt={article.title}
											className='rounded-xl size-full'
											width={100}
											height={100}
											loading='lazy'
										/>
									</div>
									<h4 className='*:inline-block font-semibold text-sm line-clamp-2'>{article.title}</h4>
								</div>
								<div className='w-full lg:w-3/12 flex items-center gap-5'>
									<p className='w-2/3'>
										<span className='text-primary bg-primary/20 text-sm rounded-lg py-1 px-2.5'>
											{article.category.name}
										</span>
									</p>
									<p className='w-1/3'>{moment(article.createdAt).locale('fa').fromNow()}</p>
								</div>
								<div className='w-full lg:w-3/12 flex items-center gap-5'>
									<div className='w-1/3'>
										<p className='text-sm flex items-center gap-2 text-red-500 bg-red-500/20 rounded-lg py-1 px-2.5 w-fit'>
											{article._count?.likes} <Small>لایک</Small>
										</p>
									</div>
									<div className='w-1/3'>
										<p className='text-sm flex items-center gap-2 text-primary bg-primary/20 rounded-lg py-1 px-2.5 w-fit'>
											{article._count?.comments} <Small>دیدگاه</Small>
										</p>
									</div>
									<div className='w-1/3'>
										<p className='text-sm flex items-center gap-2 text-secondary bg-secondary/20 rounded-lg py-1 px-2.5 w-fit'>
											{article._count?.bookmarks} <Small>نشان</Small>
										</p>
									</div>
								</div>
								<div className='w-2/12'>
									<Link href={`/articles/${article.slug}`}>رفتن به صفحه مقاله</Link>
								</div>
							</li>
						))}
					</>
				)}
			</ul>
		</div>
	)
}
