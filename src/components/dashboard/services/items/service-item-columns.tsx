import { TServiceItem } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import ServiceItemActionCell from './action-cell'

export const ServiceItemsColumns: ColumnDef<TServiceItem>[] = [
	{
		accessorKey: 'title',
		header: 'عنوان',
	},
	{
		accessorKey: 'price',
		header: 'قیمت',
		cell: ({ row }) => {
			const price = row.getValue('price') as TServiceItem['price']
			return Number(price).toLocaleString() || '-'
		},
	},
	{
		accessorKey: 'discount',
		header: 'تخفیف',
	},
	{
		accessorKey: 'service',
		header: 'خدمت',
		cell: ({ row }) => {
			const service = row.getValue('service') as TServiceItem['service']
			return service?.title || '-'
		},
	},
	{
		accessorKey: 'actions',
		header: 'عملیات',
		cell: ({ row }) => {
			const id = row.original.id as string
			return <ServiceItemActionCell id={id} />
		},
	},
]
