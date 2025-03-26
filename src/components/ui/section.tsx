import { cn } from '@/lib/utils'
import React from 'react'

export default function Section({ className, children }: { className?: string; children: React.ReactNode }) {
	return (
		<section className={cn('', className)}>
			<div className='container mx-auto py-5 lg:py-10 2xl:py-20'>{children}</div>
		</section>
	)
}
