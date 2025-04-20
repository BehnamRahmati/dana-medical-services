import { MoreHorizontalIcon } from 'lucide-react'
import * as React from 'react'

import Button, { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import Link from 'next/link'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
	return (
		<nav
			role='navigation'
			aria-label='pagination'
			data-slot='pagination'
			className={cn('mx-auto flex w-full justify-center py-5', className)}
			{...props}
		/>
	)
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
	return <ul data-slot='pagination-content' className={cn('flex flex-row items-center gap-2.5', className)} {...props} />
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
	return <li data-slot='pagination-item' {...props} />
}

type PaginationLinkProps = {
	isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
	React.ComponentProps<'a'>

function PaginationLink({ className, isActive, href = '#', size = 'icon', ...props }: PaginationLinkProps) {
	return (
		<Link
			href={href}
			aria-current={isActive ? 'page' : undefined}
			data-slot='pagination-link'
			data-active={isActive}
			className={cn(
				buttonVariants({
					variant: isActive ? 'default' : 'ghost',
					size,
				}),
				className,
			)}
			{...props}
		/>
	)
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label='Go to previous page'
			className={cn('gap-1 px-2.5 sm:pl-2.5 bg-white shadow-sm', className)}
			{...props}
		>
			<ArrowRight2 className='size-4 fill-content' />
			<span className='hidden sm:block -mb-1 '>قبلی</span>
		</PaginationLink>
	)
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label='Go to next page'
			className={cn('gap-1 px-2.5 sm:pr-2.5 bg-white shadow-sm', className)}
			{...props}
		>
			<span className='hidden sm:block -mb-1'>بعدی</span>
			<ArrowLeft2 className='size-4 fill-content' />
		</PaginationLink>
	)
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			aria-hidden
			data-slot='pagination-ellipsis'
			className={cn('flex size-9 items-center justify-center', className)}
			{...props}
		>
			<MoreHorizontalIcon className='size-4' />
			<span className='sr-only'>More pages</span>
		</span>
	)
}

export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious }
