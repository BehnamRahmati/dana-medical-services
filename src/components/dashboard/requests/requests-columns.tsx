import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TRequest, TService } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import axios from 'axios'
import { Forbidden2, MoreSquare, TickSquare, Trash } from 'iconsax-react'
import moment from 'moment-jalaali'
import { toast } from 'sonner'

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
		cell({ row }) {
			const service = row.getValue('service') as TService
			return <div className='w-fit pb-1 pt-1.5 px-2.5 rounded-md text-xs'>{service.title}</div>
		},
	},
	{
		accessorKey: 'status',
		header: 'وضعیت',
		cell({ row }) {
			const status = row.getValue('status') as string
			const renderStatus = () => {
				switch (status) {
					case 'ACCEPTED':
						return (
							<div className='w-fit pb-1 pt-1.5 px-2.5 rounded-md text-xs bg-green-500/20 text-green-500'>
								تایید شده
							</div>
						)
					case 'REJECTED':
						return (
							<div className='w-fit pb-1 pt-1.5 px-2.5 rounded-md text-xs bg-red-500/20 text-red-500'>رد شده</div>
						)
					case 'PENDING':
						return (
							<div className='w-fit pb-1 pt-1.5 px-2.5 rounded-md text-xs bg-amber-500/20 text-amber-500'>
								در انتظار بررسی
							</div>
						)
					default:
						return <div className='w-fit pb-1 pt-1.5 px-2.5 rounded-md text-xs'>انجام شده</div>
				}
			}
			return <div className='w-fit pb-1 pt-1.5 px-2.5 rounded-md text-xs'>{renderStatus()}</div>
		},
	},
	{
		accessorKey: 'requestDate',
		header: 'تاریخ',
		cell({ row }) {
			const requestDate = row.getValue('requestDate') as string
			return (
				<div className='w-fit pb-1 pt-1.5 px-2.5 rounded-md text-xs'>
					{moment(requestDate).locale('fa').format('jYYYY/jM/jD')}
				</div>
			)
		},
	},
	{
		accessorKey: 'requestedTime',
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
							<DropdownMenuItem>
								<button
									className='flex items-center gap-2 cursor-pointer text-green-500'
									onClick={async () => {
										try {
											toast('در حال تایید درخواست', { icon: '⏳' })
											await axios.patch(`/api/dashboard/requests`, { id, status: 'ACCEPTED' })
											toast(' درخواست با موفقیت تایید شد', { icon: '✅' })
										} catch (error) {
											console.log(error)
											toast('خطا در  تایید درخواست', { icon: '❌' })
										}
									}}
								>
									<TickSquare className='stroke-green-500 size-4 shrink-0' variant='Broken' />
									<p className='mt-1.5'>تایید درخواست</p>
								</button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<button
									className='flex items-center gap-2 cursor-pointer text-red-500'
									onClick={async () => {
										try {
											toast('در حال رد درخواست', { icon: '⏳' })
											await axios.patch(`/api/dashboard/requests`, { id, status: 'REJECTED' })
											toast(' درخواست با موفقیت رد شد', { icon: '✅' })
										} catch (error) {
											console.log(error)
											toast('خطا در  رد درخواست', { icon: '❌' })
										}
									}}
								>
									<Forbidden2 className='stroke-red-500 size-4 shrink-0' variant='Broken' />
									<p className='mt-1.5'>رد درخواست</p>
								</button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<button
									className='flex items-center gap-2 cursor-pointer text-red-500'
									onClick={async () => {
										try {
											toast('در حال حذف درخواست', { icon: '⏳' })
											await axios.delete(`/api/dashboard/requests/${id}`)
											toast(' درخواست با موفقیت حذف شد', { icon: '✅' })
										} catch (error) {
											console.log(error)
											toast('خطا در  حذف درخواست', { icon: '❌' })
										}
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
