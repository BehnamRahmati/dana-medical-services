'use client'

import useQueries from '@/hooks/use-queries'
import { Add } from 'iconsax-react'
import Link from 'next/link'

export default function ArticlesFilters() {
	const { currentParams, pathname } = useQueries()
	const keys = Object.keys(currentParams)

	const renderFilter = (key: string) => {
		switch (key) {
			case 'category':
				return `دسته بندی: ${currentParams[key]}`
			case 'tags':
				return `برچسب: ${currentParams[key]}`
			case 'search':
				return currentParams[key]
			default:
				return ''
		}
	}

	return (
		<div className='flex items-center gap-5'>
			{keys.map((key, index) => {
				const filteredParams = { ...currentParams }
				delete filteredParams[key]
				return (
					<Link
						href={{ pathname, query: filteredParams }}
						key={index}
						className='bg-secondary/10 text-secondary py-1 px-2.5 rounded-md text-xs flex items-center gap-1 hover:bg-secondary/30'
					>
						<span className='h-3'>{renderFilter(key)}</span>
						<Add className='size-5 stroke-secondary transform rotate-45' variant='Broken' />
					</Link>
				)
			})}
		</div>
	)
}
