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
import { TCategory } from '@/lib/types'
import { Path, UseFormReturn } from 'react-hook-form'
import useSWR from 'swr'
import { z } from 'zod'
import { dataFetcher } from '../articles/lib/helpers'
import { createFormSchema, editFormSchema } from '../articles/lib/schemas'
import { createServiceSchema, editServiceSchema } from '../services/lib/schemas'

// Define a union type of all supported schemas
type SupportedSchema =
	| z.infer<typeof createFormSchema>
	| z.infer<typeof editFormSchema>
	| z.infer<typeof createServiceSchema>
	| z.infer<typeof editServiceSchema>

// Generic type that ensures T has a category field and is one of our supported schemas
type TProps<T extends SupportedSchema & { category: string }> = {
	form: UseFormReturn<T>
	label: string
	placeholder?: string
}

export default function DashboardCategoriesSelect<T extends SupportedSchema & { category: string }>({
	label,
	form,
	placeholder,
}: TProps<T>) {
	const { data, isLoading } = useSWR<{ categories: TCategory[] }>('/api/dashboard/categories', dataFetcher)
	if (isLoading || !data) return <SelectSkeleton />

	return (
		<FormField
			control={form.control}
			name={'category' as Path<T>}
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
								{data.categories.length &&
									data.categories.map(cat => (
										<SelectItem value={cat.id} key={cat.id}>
											{cat.name}
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
