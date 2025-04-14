'use client'

import { DataTable, DataTableFilters, DatatablePagination } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { TComment } from '@/lib/types'
import {
	ColumnDef,
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table'

import React from 'react'

export default function CommentsDataTable({ data, columns }: { data: TComment[]; columns: ColumnDef<TComment>[] }) {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
	})

	return (
		<>
			<div className='flex flex-col md:flex-row items-center gap-5 justify-between'>
				<Input
					placeholder='فیلتر مقالات بر اساس عنوان ... '
					type='text'
					value={(table.getColumn('content')?.getFilterValue() as string) ?? ''}
					onChange={event => table.getColumn('content')?.setFilterValue(event.target.value)}
					className='max-w-sm placeholder:text-xs'
				/>

				<DataTableFilters table={table} />
			</div>
			<DataTable table={table} />
			<DatatablePagination table={table} />
		</>
	)
}
