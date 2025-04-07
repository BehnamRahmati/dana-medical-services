'use client'

import Button from '@/components/ui/button'
import { DataTable, DataTableFilters, DatatablePagination } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { TMenu } from '@/lib/types'
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
import { RepeatCircle } from 'iconsax-react'

import React from 'react'
import { KeyedMutator } from 'swr'

export default function MenusDataTable({
	data,
	columns,
	mutate,
}: {
	data: TMenu[]
	columns: ColumnDef<TMenu>[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mutate?: KeyedMutator<any>
}) {
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
				<div className='flex gap-5'>
					<Input
						placeholder='فیلتر مقالات بر اساس عنوان ... '
						type='text'
						value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
						onChange={event => table.getColumn('name')?.setFilterValue(event.target.value)}
						className='max-w-sm lg:w-sm placeholder:text-xs'
					/>
					{mutate && (
						<Button variant={'ghost'} size={'icon'} className='hover:*:stroke-content' onClick={() => mutate()}>
							<RepeatCircle className='size-5 stroke-border ' variant='Broken' />
						</Button>
					)}
				</div>
				<DataTableFilters table={table} />
			</div>
			<DataTable table={table} />
			<DatatablePagination table={table} />
		</>
	)
}
