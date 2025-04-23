import { Badge } from '@/components/ui/badge'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SelectSkeleton } from '@/components/ui/select'
import { TTag } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { useState } from 'react'
import { Path, UseFormReturn } from 'react-hook-form'
import useSWR from 'swr'
import { z } from 'zod'
import { dataFetcher } from '../articles/lib/helpers'
import { createFormSchema, editFormSchema } from '../articles/lib/schemas'

// Define a union type of all supported schemas
type SupportedSchema = z.infer<typeof createFormSchema> | z.infer<typeof editFormSchema>

// Generic type that ensures T has a tags field and is one of our supported schemas
type TProps<T extends SupportedSchema & { tags: string[] }> = {
	form: UseFormReturn<T>
	label: string
	placeholder?: string
}

export default function DashboardTagsSelect<T extends SupportedSchema & { tags: string[] }>({
	form,
	label,
	placeholder,
}: TProps<T>) {
	const { data, isLoading } = useSWR<{ tags: TTag[] }>('/api/dashboard/tags', dataFetcher)
	const [open, setOpen] = useState(false)

	if (isLoading || !data) return <SelectSkeleton />

	return (
		<FormField
			control={form.control}
			name={'tags' as Path<T>}
			render={({ field }) => (
				<FormItem className='flex flex-col'>
					<FormLabel>{label}</FormLabel>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<FormControl>
								<div className='relative flex min-h-10 w-full items-center justify-between rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
									<div className='flex gap-1 flex-wrap'>
										{field.value?.map((tagId: string) => {
											const tagName = data.tags.find(t => t.id === tagId)?.name || tagId
											return (
												<Badge key={tagId} variant='secondary' className='mr-1 mb-1 text-white'>
													{tagName}
													<button
														type='button'
														className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
														onClick={e => {
															e.preventDefault()
															e.stopPropagation()
															field.onChange(field.value.filter((v: string) => v !== tagId))
														}}
													>
														<X className='h-3 w-3' />
													</button>
												</Badge>
											)
										})}
										{!field.value?.length && (
											<span className='text-muted-foreground'>
												{placeholder || 'برچسب ها را انتخاب کنید...'}
											</span>
										)}
									</div>
									<ChevronsUpDown className='h-4 w-4 opacity-50' />
								</div>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className='md:w-[calc(20rem-2.5rem)] p-0'>
							<Command>
								<CommandInput placeholder='جستجو در میان برچسب ها...' />
								<CommandEmpty>هیچ برچسبی یافت نشد.</CommandEmpty>
								<CommandGroup>
									{data.tags.map(tag => {
										const isSelected = field.value?.includes(tag.id)
										return (
											<CommandItem
												key={tag.id}
												value={tag.id}
												dir='ltr'
												className='justify-between'
												onSelect={() => {
													if (isSelected) {
														field.onChange(field.value.filter((v: string) => v !== tag.id))
													} else {
														field.onChange([...(field.value || []), tag.id])
													}
													setOpen(true) // Keep the popover open after selection
												}}
											>
												<Check className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')} />
												{tag.name}
											</CommandItem>
										)
									})}
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
