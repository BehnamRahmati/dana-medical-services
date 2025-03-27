import { cn } from '@/lib/utils'
import { DirectLeft } from 'iconsax-react'
import Link from 'next/link'
import React from 'react'

export default function HomeMoreLink({ className, href = '/', children, ...props }: React.ComponentProps<'a'>) {
	return (
		<Link
			href={href}
			className={cn(
				'text-2xl text-content/60 flex items-center gap-2 group hover:text-primary transition-colors duration-200',
				className,
			)}
			{...props}
		>
			{children}
			<DirectLeft
				size='27'
				className='fill-content/60 group-hover:fill-primary transition-colors duration-200'
				variant='Bulk'
			/>
		</Link>
	)
}
