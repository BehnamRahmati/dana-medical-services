'use client'
import { Copy } from 'iconsax-react'
import { useEffect, useState } from 'react'

export default function PostContentFooterSharing({ slug }: { slug: string }) {
	const [address, setAddress] = useState('')

	useEffect(() => {
		setAddress(`http://localhost:3000/articles/${slug}`)
	}, [slug])

	return (
		<div>
			<div className='flex items-center gap-2 pt-1.5 pb-1 px-2.5 border border-border rounded-full '>
				<p dir='ltr' className='w-56 truncate overflow-hidden mt-1 text-content/40 text-sm'>
					{address}
				</p>
				<button onClick={() => navigator.clipboard.writeText(address)}>
					<Copy className='size-5 fill-content' variant='Bulk' />
				</button>
			</div>
		</div>
	)
}
