import { TTag } from '@/lib/types'
import { Clock } from 'iconsax-react'
import moment from 'moment'
import Link from 'next/link'

export default function PostContentFooterMeta({ createdAt, tags }: { createdAt: Date; tags: TTag[] }) {
	return (
		<div className='flex flex-col md:flex-row gap-5 items-center justify-between'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<Clock className='size-5 fill-content ' variant='Bulk' />
					<div className='mt-1 '>{moment(createdAt).locale('fa').fromNow()}</div>
				</div>
			</div>
			<ul className='flex items-center gap-2'>
				{tags.map(tag => (
					<li key={tag.id}>
						<Link
							href={`/articles?tags=${tag.slug}`}
							className='bg-content/20 pb-1 pt-1.5 px-2.5 rounded-sm inline-block text-sm'
						>
							#{tag.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
