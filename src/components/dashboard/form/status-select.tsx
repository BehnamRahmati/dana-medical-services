import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Path, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { createFormSchema, editFormSchema } from '../articles/lib/schemas'
import { createServiceSchema, editServiceSchema } from '../services/lib/schemas'

// Define a union type of all supported schemas
type SupportedSchema =
	| z.infer<typeof createFormSchema>
	| z.infer<typeof editFormSchema>
	| z.infer<typeof createServiceSchema>
	| z.infer<typeof editServiceSchema>

// Generic type that ensures T has a status field and is one of our supported schemas
type TProps<T extends SupportedSchema & { status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' }> = {
	form: UseFormReturn<T>
	label: string
}

export default function DashboardStatusSelect<T extends SupportedSchema & { status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' }>({
	form,
	label,
}: TProps<T>) {
	return (
		<FormField
			control={form.control}
			name={'status' as Path<T>}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
						<FormControl>
							<SelectTrigger className='w-full'>
								<SelectValue />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							<SelectGroup>
								<SelectItem value='DRAFT'>پیش نویس</SelectItem>
								<SelectItem value='PUBLISHED'>منتشر شده</SelectItem>
								<SelectItem value='ARCHIVED'>بایگانی شده</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
