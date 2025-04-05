'use client'

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TServices } from '@/lib/types'
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table'
import { ArrowDown2, ArrowSquareLeft, ArrowSquareRight } from 'iconsax-react'

import React from 'react'

export default function ServicesDataTable({ data, columns }: { data: TServices[]; columns: ColumnDef<TServices>[] }) {
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
					value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
					onChange={event => table.getColumn('title')?.setFilterValue(event.target.value)}
					className='max-w-sm placeholder:text-xs'
				/>

				<div className='flex items-center gap-2'>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={value => {
							table.setPageSize(Number(value))
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent>
							{[10, 20, 30, 40, 50].map(pageSize => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className='flex items-center gap-3 border border-input rounded-md py-1.5 px-2.5 text-sm shadow-xs'>
								<span> حذف ستون ها </span>
								<ArrowDown2 className='size-4 stroke-content' variant='Broken' />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='start'>
							{table
								.getAllColumns()
								.filter(column => column.getCanHide())
								.map(column => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className='capitalize'
											checked={column.getIsVisible()}
											onCheckedChange={value => column.toggleVisibility(!!value)}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									)
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className='border-border border rounded-md mt-5 overflow-hidden'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									نتیجه ای یافت نشد!
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center  mt-5 '>
				<div className='border border-input flex items-center p-2.5 gap-2.5 *:disabled:text-content/30 rounded-md *:text-sm'>
					<p>
						صفحه {table.getState().pagination.pageIndex + 1} از {table.getPageCount()}
					</p>
					<button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
						اولین
					</button>
					<button
						className='disabled:*:stroke-content/30'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<ArrowSquareRight className='size-5 stroke-content' variant='Broken' />
					</button>

					<button
						className='disabled:*:stroke-content/30'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<ArrowSquareLeft className='size-5 stroke-content' variant='Broken' />
					</button>

					<button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
						آخرین
					</button>
				</div>
			</div>
		</>
	)
}
