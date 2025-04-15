import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectSkeleton,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { TService } from '@/lib/types'
import { UseFormReturn } from 'react-hook-form'
import useSWR from 'swr'
import { z } from 'zod'
import { dataFetcher } from '../articles/lib/helpers'
import { serviceItemsFormSchema } from '../services/items/create/service-items-schema'

// Generic type that ensures T has a category field and is one of our supported schemas
type TProps = {
	form: UseFormReturn<z.infer<typeof serviceItemsFormSchema>>
	label: string
	placeholder?: string
}

export default function DashboardServicesSelect({ label, form, placeholder }: TProps) {
	const { data, isLoading } = useSWR<{ services: TService[] }>('/api/dashboard/services', dataFetcher)
	if (isLoading || !data) return <SelectSkeleton />

	return (
		<FormField
			control={form.control}
			name='serviceId'
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							<SelectGroup>
								{data.services.length &&
									data.services.map(service => (
										<SelectItem value={service.id} key={service.id}>
											{service.title}
										</SelectItem>
									))}
							</SelectGroup>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
