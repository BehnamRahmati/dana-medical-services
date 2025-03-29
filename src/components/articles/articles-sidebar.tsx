import { Hashtag } from 'iconsax-react'

export default function ArticlesSidebar() {
	return (
		<aside className='w-full lg:w-80'>
			<div className='border border-border rounded-lg py-10 px-5'>
				<div className='flex items-center gap-2'>
					<Hashtag className='size-10 fill-content' variant='Bulk' />
					<h3 className='text-2xl font-bold mt-2'>تگ های محبوب</h3>
				</div>
				<ul className='flex items-center flex-wrap mt-5 gap-2'>
					<li className='bg-content/20 pt-1 pb-0.5 px-2.5 rounded-lg'>#فیزیوتراپی</li>
					<li className='bg-content/20 pt-1 pb-0.5 px-2.5 rounded-lg'>#تست_کرونا_منزل</li>
					<li className='bg-content/20 pt-1 pb-0.5 px-2.5 rounded-lg'>#فیزیوتراپی</li>
					<li className='bg-content/20 pt-1 pb-0.5 px-2.5 rounded-lg'>#فیزیوتراپی</li>
					<li className='bg-content/20 pt-1 pb-0.5 px-2.5 rounded-lg'>#فیزیوتراپی</li>
					<li className='bg-content/20 pt-1 pb-0.5 px-2.5 rounded-lg'>#فیزیوتراپی</li>
				</ul>
			</div>
		</aside>
	)
}
