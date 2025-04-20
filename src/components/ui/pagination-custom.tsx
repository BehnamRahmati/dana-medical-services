import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import useQueries from '@/hooks/use-queries'

export default function PaginationCustom({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
	const { currentParams, pathname } = useQueries()
	return (
		<Pagination>
			<PaginationContent>
				{currentPage > 1 && (
					<PaginationItem>
						<PaginationPrevious
							href={`${pathname}?${new URLSearchParams({ ...currentParams, page: (currentPage - 1).toString() })}`}
						/>
					</PaginationItem>
				)}
				{currentPage > 2 && (
					<PaginationItem>
						<PaginationLink className='bg-white shadow-sm pb-1.5 px-3' href='#'>
							{currentPage - 1}
						</PaginationLink>
					</PaginationItem>
				)}
				<PaginationItem>
					<PaginationLink href='#' className='pb-1.5 px-3' isActive>
						{currentPage}
					</PaginationLink>
				</PaginationItem>
				{currentPage < totalPages && (
					<PaginationItem>
						<PaginationLink className='bg-white shadow-sm pb-1.5 px-3' href='#'>
							{currentPage + 1}
						</PaginationLink>
					</PaginationItem>
				)}
				{currentPage + 1 < totalPages && (
					<PaginationItem>
						<PaginationLink className='bg-white shadow-sm pb-1.5 px-3' href='#'>
							{currentPage + 2}
						</PaginationLink>
					</PaginationItem>
				)}
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				{currentPage < totalPages && (
					<PaginationItem>
						<PaginationNext
							href={`${pathname}?${new URLSearchParams({ ...currentParams, page: (currentPage + 1).toString() })}`}
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	)
}
