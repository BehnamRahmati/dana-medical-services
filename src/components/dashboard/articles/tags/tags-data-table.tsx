'use client'

import { DataTable, DataTableFilters, DatatablePagination } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { TTag } from '@/lib/types'
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

export default function TagsDataTable({ data, columns }: { data: TTag[]; columns: ColumnDef<TTag>[] }) {
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
			<div className='flex items-center gap-5 justify-between'>
				<Input
					placeholder='فیلتر مقالات بر اساس عنوان ... '
					type='text'
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={event => table.getColumn('name')?.setFilterValue(event.target.value)}
					className='max-w-sm placeholder:text-xs'
				/>

				<DataTableFilters table={table} />
			</div>
			<DataTable table={table} />
			<DatatablePagination table={table} />
		</>
	)
}
