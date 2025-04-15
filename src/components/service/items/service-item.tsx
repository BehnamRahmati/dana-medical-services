import { H2 } from '@/components/ui/typography'
import { TServiceItem } from '@/lib/types'
import { DiscountShape } from 'iconsax-react'

export default function ServiceItem({ item }: { item: TServiceItem }) {
	return (
		<div className='p-5 flex flex-col justify-between bg-muted lg:bg-transparent rounded-xl lg:rounded-none'>
			<div>
				<H2 className='text-secondary text-center'>{item.title}</H2>
				<div
					className='my-10 max-w-3xs *:text-content/60 *:text-center *:mb-5 service-item-content'
					dangerouslySetInnerHTML={{ __html: item.description }}
				/>
			</div>

			<div className='border-t border-t-border pt-5 relative'>
				{item.discount && item.discount > 0 ? (
					<>
						<p className='text-red-500 absolute top-1 right-0 flex items-center text-xl'>
							<DiscountShape className='fill-red-500 size-5' variant='Bulk' />
							<span className='-mb-1'>{item.discount}</span>
						</p>
						<span className='text-content/50 line-through font-bold text-xl inline-block'>
							{Number(item.price).toLocaleString()}
						</span>
						<span className='text-secondary font-bold text-5xl inline-block'>
							{Number((item.price * (100 - item.discount)) / 100).toLocaleString()}
						</span>
						<span>تومان</span>
					</>
				) : (
					<p className='text-end'>
						<span className='font-bold text-5xl inline-block ml-2 text-secondary'>
							{Number(item.price).toLocaleString()}
						</span>
						<span>تومان</span>
					</p>
				)}
			</div>
		</div>
	)
}
