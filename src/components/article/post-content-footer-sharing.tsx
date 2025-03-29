import { Copy } from 'iconsax-react'

export default function PostContentFooterSharing() {
	return (
		<div>
			<div className='flex items-center gap-1 pt-1.5 pb-1 px-2.5 border border-border rounded-full '>
				<p dir='ltr' className='w-44 truncate overflow-hidden mt-1 text-content/40 text-sm'>
					https://roocket.ir/articles/ecmascript-vs-javascript
				</p>
				<Copy className='size-5 fill-content' variant='Bulk' />
			</div>
		</div>
	)
}
