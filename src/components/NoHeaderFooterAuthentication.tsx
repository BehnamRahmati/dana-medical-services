'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

export default function NoHeaderFooterAuthentication({ ...props }: React.ComponentProps<'div'>) {
	const pathname = usePathname()

	if (pathname?.startsWith('/login') || pathname?.startsWith('/register') || pathname?.startsWith('/dashboard')) return <></>
	return <div {...props} />
}
