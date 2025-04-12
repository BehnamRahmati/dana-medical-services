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
import { TUser } from '@/lib/types'
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

// Generic type that ensures T has a author field and is one of our supported schemas
type TProps<T extends SupportedSchema & { author: string }> = {
	form: UseFormReturn<T>
	label: string
	placeholder?: string
}

export default function DashboardUsersSelect<T extends SupportedSchema & { author: string }>({
	form,
	label,
	placeholder,
}: TProps<T>) {
	const { data, isLoading } = useSWR<{ users: TUser[] }>('/api/dashboard/users', dataFetcher)
	if (isLoading || !data) return <SelectSkeleton />

	return (
		<FormField
			control={form.control}
			name={'author' as Path<T>}
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
								{data.users.length &&
									data.users.map(user => (
										<SelectItem value={user.id} key={user.id}>
											{user.name}
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
