import { cn } from '@/lib/utils'
import React from 'react'

export default function DashboardSidebarSeperator({ className, ...props }: React.ComponentProps<'div'>) {
	return <div className={cn('border-b border-b-border w-full mx-auto my-2.5', className)} {...props} />
}
