import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
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

// Generic type that ensures T has a slug field and is one of our supported schemas
type TProps<T extends SupportedSchema & { slug: string }> = {
	form: UseFormReturn<T>
	label: string
	placeholder?: string
}

export default function DashboardSlugInput<T extends SupportedSchema & { slug: string }>({
	form,
	label,
	placeholder,
}: TProps<T>) {
	return (
		<FormField
			control={form.control}
			name={'slug' as Path<T>}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input type='text' placeholder={placeholder} {...field} />
					</FormControl>
					<FormDescription>
						پیوند یکتا برای آدرس مقاله استفاده می شود و باید به زبان انگلیسی و بدون فاصله باشد.
					</FormDescription>
					<FormDescription>مثال: my-first-article</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
