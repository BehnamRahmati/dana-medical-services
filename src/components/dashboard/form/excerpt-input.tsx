import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
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

// Generic type that ensures T has a excerpt field and is one of our supported schemas
type TProps<T extends SupportedSchema & { excerpt: string }> = {
	form: UseFormReturn<T>
	label: string
	placeholder?: string
}

export default function DashboardExcerptInput<T extends SupportedSchema & { excerpt: string }>({
	form,
	placeholder,
	label,
}: TProps<T>) {
	return (
		<FormField
			control={form.control}
			name={'excerpt' as Path<T>}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Textarea placeholder={placeholder} {...field} />
					</FormControl>
					<FormDescription>توضیح کوتاه مقاله در صفحه اصلی و لیست مقالات نمایش داده می شود.</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
