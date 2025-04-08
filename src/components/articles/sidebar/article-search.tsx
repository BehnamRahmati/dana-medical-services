'use client'

import { Input } from '@/components/ui/input'
import useQueries from '@/hooks/use-queries'
import { FilterSearch, SearchNormal1 } from 'iconsax-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function ArticleSearch() {
	const { currentParams, pathname } = useQueries()
	const [term, setTerm] = React.useState('')
	const router = useRouter()
	return (
		<div className='border border-border rounded-lg py-10 px-5'>
			<div className='flex items-center gap-2'>
				<FilterSearch className='size-10 fill-content' variant='Bulk' />
				<h3 className='text-2xl font-bold mt-2'> جستجوی مقالات</h3>
			</div>
			<div className='flex items-center mt-5 relative'>
				<Input
					type='text'
					className='pl-5'
					value={term}
					onChange={e => setTerm(e.target.value)}
					placeholder='عنوان مقاله را وارد کنید ...'
					onKeyDown={e => {
						if (e.key === 'Enter') {
							router.push(`${pathname}?${new URLSearchParams({ ...currentParams, ...{ search: term } })}`)
						}
					}}
				/>
				<Link
					className='inline-block absolute top-2 left-1'
					href={{ pathname, query: { ...currentParams, ...{ search: term } } }}
				>
					<SearchNormal1 className='size-5 fill-content' variant='Bulk' />
				</Link>
			</div>
		</div>
	)
}
