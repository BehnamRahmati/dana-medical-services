import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import TiptapEditor from '@/components/ui/tiptap-editor'
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

// Generic type that ensures T has a content field and is one of our supported schemas
type TProps<T extends SupportedSchema & { content: string }> = {
	form: UseFormReturn<T>
	label: string
}

export default function DashboardContentEditor<T extends SupportedSchema & { content: string }>({ label, form }: TProps<T>) {
	return (
		<FormField
			control={form.control}
			name={'content' as Path<T>}
			render={({ field }) => (
				<FormItem className='main-editor'>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						{/* <QuillEditor onChangeEditor={field.onChange} editorValue={field.value} /> */}
						<TiptapEditor value={field.value} onChange={field.onChange} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
