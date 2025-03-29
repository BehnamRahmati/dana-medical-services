import { DocumentFilter } from 'iconsax-react'

export default function ArticlesMainHeader() {
	return (
		<div className='flex items-center gap-5 pb-5 border-b border-b-border mb-5'>
			<div className='border border-border py-2.5 px-5 rounded-lg'>
				<span className='font-bold'>فیلتر زمانی</span>
				<span className='text-xs inline-block mr-1'>(بروزترین)</span>
				<DocumentFilter className='w-9 fill-content inline-block mr-2 pr-2 border-r border-r-border' variant='Bulk' />
			</div>

			<div className='border border-border py-2.5 px-5 rounded-lg'>
				<span className='font-bold'>فیلتر نمایش</span>
				<span className='text-xs inline-block mr-1'>(همه)</span>
				<DocumentFilter className='w-9 fill-content inline-block mr-2 pr-2 border-r border-r-border' variant='Bulk' />
			</div>
		</div>
	)
}
