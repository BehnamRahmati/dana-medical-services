import { Star1 } from 'iconsax-react'

export default function PostContentFooterRating() {
	return (
		<div className='flex flex-col sm:flex-row gap-5 items-center justify-between bg-content/20 p-2.5 rounded-lg'>
			<p className=''>چه امتیازی به این مقاله میدهید؟</p>
			<div className='flex items-center gap-2'>
				<ul className='flex items-center '>
					<li>
						<Star1 className='size-5 stroke-yellow-400 fill-yellow-300' variant='TwoTone' />
					</li>
					<li>
						<Star1 className='size-5 stroke-yellow-400 fill-yellow-300' variant='TwoTone' />
					</li>
					<li>
						<Star1 className='size-5 stroke-yellow-400 fill-yellow-300' variant='TwoTone' />
					</li>
					<li>
						<Star1 className='size-5 stroke-yellow-400 fill-yellow-300' variant='TwoTone' />
					</li>
					<li>
						<Star1 className='size-5 stroke-yellow-400 ' variant='TwoTone' />
					</li>
				</ul>
				<p className='flex items-center gap-1'>
					<span>4</span>
					<span>از</span>
					<span>5</span>
				</p>
			</div>
		</div>
	)
}
