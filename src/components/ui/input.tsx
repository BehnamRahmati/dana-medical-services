import { cn } from '@/lib/utils'
import React from 'react'

export default function Input({ className, ...props }: React.ComponentProps<'input'>) {
	return <input className={cn('', className)} {...props} />
}
