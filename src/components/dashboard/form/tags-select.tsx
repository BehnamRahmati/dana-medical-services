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
import { TTag } from '@/lib/types'
import { Path, UseFormReturn } from 'react-hook-form'
import useSWR from 'swr'
import { z } from 'zod'
import { dataFetcher } from '../articles/lib/helpers'
import { createFormSchema, editFormSchema } from '../articles/lib/schemas'

// Define a union type of all supported schemas
type SupportedSchema = z.infer<typeof createFormSchema> | z.infer<typeof editFormSchema>

// Generic type that ensures T has a tag field and is one of our supported schemas
type TProps<T extends SupportedSchema & { tag: string }> = {
	form: UseFormReturn<T>
	label: string
	placeholder?: string
}

export default function DashboardTagsSelect<T extends SupportedSchema & { tag: string }>({
	form,
	label,
	placeholder,
}: TProps<T>) {
	const { data, isLoading } = useSWR<{ tags: TTag[] }>('/api/dashboard/tags', dataFetcher)

	if (isLoading || !data) return <SelectSkeleton />
	return (
		<FormField
			control={form.control}
			name={'tag' as Path<T>}
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
								{data.tags.length &&
									data.tags.map(tag => (
										<SelectItem value={tag.id} key={tag.id}>
											{tag.name}
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
