import clinicBg from '@/assets/clinic-bg.jpg'
import { TArticle } from '@/lib/types'
import { Clock } from 'iconsax-react'
import Link from 'next/link'

export default function MagazineBanner({ articles }: { articles: TArticle[] }) {
	return (
		<div className=''>
			<div
				className='bg-cover bg-blend-overlay bg-slate-700 -mt-20 lg:-mt-40.5 2xl:-mt-50 h-screen w-full  '
				style={{ backgroundImage: `url('${clinicBg.src}')` }}
			>
				<div className='container mx-auto flex flex-col h-full px-2.5 lg:px-5'>
					<div className='h-24 lg:h-44 2xl:h-56 shrink-0'></div>
					<div className='grid grid-cols-1 md:grid-cols-12 grid-rows-4 gap-2.5 pb-5 flex-1'>
						{articles.map((article, i) => {
							return (
								<div
									className='bg-slate-600 group rounded-2xl bg-cover bg-blend-overlay row-span-1 col-span-1  md:col-span-3 md:row-span-2 md:first:row-span-4 md:first:col-span-6 md:nth-of-type-[2]:row-span-4'
									style={{ backgroundImage: `url('${article.thumbnail}')` }}
									key={article.id}
								>
									<div className={`size-full flex flex-col justify-end p-2.5`}>
										<div className='flex items-center justify-between mb-2'>
											<Link
												href={`/articles?category=${article.category.slug}`}
												className='bg-secondary text-white px-2.5 py-1 rounded-sm text-xs'
											>
												{article.category.name}
											</Link>
											<div className='bg-content/20 text-content px-2.5 py-1 rounded-sm text-xs flex items-center gap-2'>
												<Clock className='stroke-content size-3' variant='Broken' />
												{article.read}
												<span>دقیقه</span>
											</div>
										</div>
										<Link
											href={`/articles/${article.slug}`}
											className={`font-black text-white text-2xl 2xl:text-4xl hover:text-primary ${i > 1 && 'lg:text-xl'}`}
										>
											{article.title}
										</Link>
										<p
											className={`text-white/70 transition-[height] duration-200 leading-7 h-0 group-hover:h-14 overflow-hidden`}
										>
											{article.excerpt}
										</p>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}
