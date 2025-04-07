'use client'

import { usePathname, useSearchParams } from 'next/navigation'

export default function useQueries() {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const currentParams = searchParams ? Object.fromEntries(searchParams.entries()) : {}
	return { pathname, currentParams }
}
