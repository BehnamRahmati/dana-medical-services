import { TArticle } from '@/lib/types'
import { Bookmark2, Heart, MessageText1, Watch } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'

export default function PostCard({ article }: { article: TArticle }) {
	return (
		<div className='w-full bg-accent min-h-32 p-5 rounded-xl border border-border group'>
			<div className='bg-border w-full h-52 rounded-xl overflow-hidden'>
				<Image
					src={article.thumbnail}
					className='w-full h-full transform group-hover:scale-110 transition-transform duration-200 ease-in-out'
					height={500}
					width={300}
					loading='lazy'
					alt={article.title}
				/>
			</div>
			<Link
				href={`/articles/${article.slug}`}
				className='text-xl mt-2 font-extrabold block transition-colors duration-200 hover:text-primary'
			>
				{article.title}
			</Link>
			<div className='flex items-center justify-between mt-5'>
				<div className='flex items-center gap-2'>
					<div className='size-7 bg-slate-500 rounded-full overflow-hidden'>
						<Image src={article.author.image} height={50} width={50} alt={article.author.name} />
					</div>
					<p className='text-sm font-bold text-slate-400'>{article.author.name}</p>
				</div>
				<Link
					href={`/articles?category=${article.category.slug}`}
					className='bg-primary/20 px-2.5 py-1 rounded-lg text-sm text-primary hover:bg-primary/40 transition-colors duration-200 hover:text-primary'
				>
					{article.category.name}
				</Link>
			</div>
			<div className='flex items-center justify-between mt-4'>
				<ul className='flex gap-2.5 items-center'>
					<li className='text-secondary bg-secondary/20 p-1 rounded-sm flex items-center'>
						<Bookmark2 size='15' className='fill-secondary' variant='Bulk' />
						<span className='text-xs mr-1 -mb-1'>{article._count?.bookmarks}</span>
					</li>
					<li className='text-red-500 bg-red-500/20 p-1 rounded-sm flex items-center'>
						<Heart size='15' className='fill-red-500' variant='Bulk' />
						<span className='text-xs mr-1 -mb-1'>{article._count?.likes}</span>
					</li>
					<li className='text-primary bg-primary/20 p-1 rounded-sm flex items-center'>
						<MessageText1 size='15' className='fill-primary' variant='Bulk' />
						<span className='text-xs mr-1 -mb-1'>{article._count?.comments}</span>
					</li>
				</ul>
				<p className='text-sm text-slate-400 flex items-center gap-1'>
					<Watch size='15' className='fill-content' variant='Bulk' />
					<span>زمان مطالعه :</span>
					<span>{article.read} دقیقه</span>
				</p>
			</div>
		</div>
	)
}
