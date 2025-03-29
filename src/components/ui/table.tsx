import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

export default function Table({ columns, data }: { columns: any; data: any }) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})
	return (
		<div>
			<div className='header'>
				{table.getHeaderGroups().map(headerGroup => (
					<div key={headerGroup.id} className='header-row'>
						{headerGroup.headers.map(header => {
							return (
								<div key={header.id} className='header-item'>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</div>
							)
						})}
					</div>
				))}
			</div>
			<div className='body'>
				{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map(row => (
						<div className='body-rows' key={row.id} data-state={row.getIsSelected() && 'selected'}>
							{row.getVisibleCells().map(cell => (
								<div key={cell.id} className='body-item'>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</div>
							))}
						</div>
					))
				) : (
					<div className='body-rows'>
						<div className='body-items'>No results.</div>
					</div>
				)}
			</div>
		</div>
	)
}
