'use client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select'
import useQueries from '@/hooks/use-queries'
import { DocumentFilter } from 'iconsax-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
export default function ServicesMainHeader() {
	const { currentParams, pathname } = useQueries()
	const [open, setOpen] = useState(false)
	const [secondOpen, setSecondOpen] = useState(false)
	const router = useRouter()
	const [value, setvalue] = useState(() => (currentParams.sort ? currentParams.sort : 'createdAt_desc'))

	const handleValueChange = useCallback(
		(value: string) => {
			setvalue(value)
			router.push(`${pathname}?${new URLSearchParams({ ...currentParams, ...{ sort: value } })}`)
		},
		[currentParams, pathname, router],
	)

	const renderValue = useCallback((currentValue: string) => {
		switch (currentValue) {
			case 'views_asc':
				return 'کمترین بازدید'

			case 'views_desc':
				return ' بیشترین بازدید '

			case 'comments_asc':
				return ' کمترین دیدگاه '

			case 'comments_desc':
				return ' بیشترین دیدگاه'

			case 'likes_asc':
				return ' کمترین لایک'

			case 'likes_desc':
				return ' بیشترین لایک'

			default:
				return 'همه'
		}
	}, [])

	return (
		<div className='flex items-center justify-start gap-2.5 lg:gap-5 pb-5 border-b border-b-border mb-5'>
			<div>
				<button
					type='button'
					aria-label='open menu'
					onClick={() => setOpen(prev => !prev)}
					className='border border-border py-1 px-2.5 lg:py-2.5 lg:px-5 rounded-lg cursor-pointer w-full'
				>
					<span className='font-bold text-sm lg:text-base'>فیلتر زمانی</span>
					<span className='text-xs inline-block mr-1'>({value === 'createdAt_asc' ? 'قدیمی ترین' : 'بروزترین'})</span>
					<DocumentFilter
						className='size-6 lg:size-8 fill-content inline-block mr-2 pr-2 border-r border-r-border'
						variant='Bulk'
					/>
				</button>

				<Select open={open} onOpenChange={setOpen} defaultValue={value} value={value} onValueChange={handleValueChange}>
					<SelectTrigger className='h-0! w-full *:hidden border-0 p-0 overflow-hidden'></SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value='createdAt_desc'>بروزترین</SelectItem>
							<SelectItem value='createdAt_asc'>قدیمی تربن</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<div className='flex-1 lg:flex-none'>
				<button
					type='button'
					aria-label='open menu'
					onClick={() => setSecondOpen(prev => !prev)}
					className='border border-border py-1 px-2.5 lg:py-2.5 lg:px-5 rounded-lg cursor-pointer w-full'
				>
					<span className='font-bold text-sm lg:text-base'>فیلتر نمایش</span>
					<span className='text-xs inline-block mr-1'>({renderValue(value)})</span>
					<DocumentFilter
						className='size-6 lg:size-8 fill-content inline-block mr-2 pr-2 border-r border-r-border'
						variant='Bulk'
					/>
				</button>

				<Select open={secondOpen} onOpenChange={setSecondOpen} value={value} onValueChange={handleValueChange}>
					<SelectTrigger className='h-0! w-full *:hidden border-0 p-0 overflow-hidden'></SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value='views_asc'>کمترین بازدید</SelectItem>
							<SelectItem value='views_desc'>بیشترین بازدید </SelectItem>
							<SelectItem value='comments_asc'>کمترین دیدگاه </SelectItem>
							<SelectItem value='comments_desc'>بیشترین دیدگاه</SelectItem>
							<SelectItem value='likes_asc'>کمترین لایک</SelectItem>
							<SelectItem value='likes_desc'>بیشترین لایک</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}
