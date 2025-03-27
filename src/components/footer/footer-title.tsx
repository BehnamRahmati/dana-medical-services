import { cn } from '@/lib/utils'
import React from 'react'

export default function FooterTitle({ className, ...props }: React.ComponentProps<'h3'>) {
	return <h3 className={cn('text-lg font-bold', className)} {...props} />
}
