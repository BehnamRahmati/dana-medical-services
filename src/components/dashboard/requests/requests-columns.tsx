import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TRequest } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import axios from 'axios'
import { MoreSquare, TickSquare, Trash } from 'iconsax-react'
import moment from 'moment'

export const RequestsColumns: ColumnDef<TRequest>[] = [
	{
		accessorKey: 'name',
		header: 'نام',
	},
	{
		accessorKey: 'phone',
		header: 'شماره تلفن',
	},
	{
		accessorKey: 'service',
		header: 'سرویس',
	},
	{
		accessorKey: 'status',
		header: 'وضعیت',
	},
	{
		accessorKey: 'requestDate',
		header: 'تاریخ',
		cell({ row }) {
			const requestDate = row.getValue('requestDate') as string
			return <div className='w-fit pb-1 pt-1.5 px-2.5 rounded-md text-xs'>{moment(requestDate).locale('fa').fromNow()}</div>
		},
	},
	{
		accessorKey: 'requastTime',
		header: 'ساعت',
	},
	{
		accessorKey: 'action',
		header: 'عملیات',
		cell: ({ row }) => {
			const id = row.original.id as string
			return (
				<div className='flex items-center gap-1'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<MoreSquare className='stroke-content size-5' variant='Broken' />
						</DropdownMenuTrigger>
						<DropdownMenuContent align='start'>
							<DropdownMenuLabel> عملیات</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<button
									className='flex items-center gap-2 cursor-pointer '
									onClick={() => {
										axios.patch(`/api/dashboard/requests`, { id , status: 'ACCEPTED'})
									}}
								>
									<TickSquare className='stroke-green-500 size-4 shrink-0' variant='Broken' />
									<p className='mt-1.5'>تایید درخواست</p>
								</button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<button
									className='flex items-center gap-2 cursor-pointer '
									onClick={() => {
										axios.patch(`/api/dashboard/requests`, { id, status: 'REJECTED' })
									}}
								>
									<TickSquare className='stroke-green-500 size-4 shrink-0' variant='Broken' />
									<p className='mt-1.5'>رد درخواست</p>
								</button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<button
									className='flex items-center gap-2 cursor-pointer '
									onClick={() => {
										axios.delete(`/api/dashboard/requests/${id}`)
									}}
								>
									<Trash className='stroke-red-500 size-4 shrink-0' variant='Broken' />
									<p className='mt-1.5'>حذف درخواست</p>
								</button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)
		},
	},
]
