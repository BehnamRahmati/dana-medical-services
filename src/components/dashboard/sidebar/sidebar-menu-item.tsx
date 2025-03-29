import { cn } from '@/lib/utils'
import React from 'react'

export default function DashboardSidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
	return <li className={cn('flex items-center gap-2 w-full', className)} {...props} />
}
