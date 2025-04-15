'use client'

import Button from '@/components/ui/button'
import { DataTable, DataTableFilters, DatatablePagination } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
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
import { Refresh } from 'iconsax-react'
import React from 'react'
import { KeyedMutator } from 'swr'

type GenericDataTableProps<TData> = {
	data: TData[]
	columns: ColumnDef<TData>[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mutate: KeyedMutator<any>
	filterColumn?: string
	filterPlaceholder?: string
	createFormComponent?: React.ReactNode
	responseKey?: string
}

export default function GenericDataTable<TData>({
	data,
	columns,
	mutate,
	filterColumn = 'title',
	filterPlaceholder = 'فیلتر بر اساس عنوان ... ',
	createFormComponent,
}: GenericDataTableProps<TData>) {
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

	const handleRefresh = () => {
		mutate()
	}

	return (
		<>
			<div className='flex flex-col md:flex-row items-center gap-2.5 lg:gap-5 justify-between'>
				<div className='flex gap-2 w-full  flex-1'>
					{filterColumn && table.getColumn(filterColumn) && (
						<Input
							placeholder={filterPlaceholder}
							type='text'
							value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ''}
							onChange={event => table.getColumn(filterColumn)?.setFilterValue(event.target.value)}
							className='max-w-sm placeholder:text-xs'
						/>
					)}
					<Button
						variant={'ghost'}
						size={'icon'}
						onClick={handleRefresh}
						className='bg-secondary/20 hover:bg-secondary/40'
						aria-label='بازنشانی'
						title='بازنشانی'
					>
						<Refresh className='size-4 stroke-secondary' variant='Broken' />
					</Button>
				</div>

				<div className='flex flex-wrap gap-2'>
					{createFormComponent}
					<DataTableFilters table={table} />
				</div>
			</div>
			<DataTable table={table} />
			<DatatablePagination table={table} />
		</>
	)
}
