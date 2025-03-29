import { cn } from '@/lib/utils'
import React from 'react'

export default function DashboardSidebarMenu({
	className,
	isSubMenu,
	...props
}: React.ComponentProps<'ul'> & { isSubMenu?: boolean }) {
	return (
		<ul
			className={cn(
				`flex flex-col gap-2 ${isSubMenu && 'pr-2.5 mr-5 border-r border-border *:py-1 my-2 *:hover:font-bold'}`,
				className,
			)}
			{...props}
		/>
	)
}
