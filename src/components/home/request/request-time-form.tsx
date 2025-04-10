'use client'

import Button from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns-jalali'
import { Calendar as CalendarIcon } from 'iconsax-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
export const timeSchema = z.object({
	date: z.date().min(new Date(), { message: 'Start date must be in the future' }),
	time: z.enum(['2-4', '4-6', '6-8']),
})

type TProps = {
	onSubmit: (data: z.infer<typeof timeSchema>) => void
	onBack: () => void
}

export default function RequestTimeForm({ onSubmit, onBack }: TProps) {
	const form = useForm<z.infer<typeof timeSchema>>({
		resolver: zodResolver(timeSchema),
		defaultValues: { date: new Date(), time: '2-4' },
	})
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-10'>
				<FormField
					control={form.control}
					name='date'
					render={({ field }) => (
						<FormItem>
							<FormLabel>تاریخ اعزام متخصص</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'default'}
											className={cn(
												'w-full pl-3 text-left font-normal bg-accent border border-border text-content',
												!field.value && 'text-muted-foreground',
											)}
										>
											{field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0 overflow-hidden' align='start'>
									<Calendar
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										className='bg-accent'
										disabled={date => date < new Date()}
									/>
								</PopoverContent>
							</Popover>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='time'
					render={({ field }) => (
						<FormItem>
							<FormLabel>ساعت اعزام متخصص</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className='flex gap-1 justify-between'
								>
									<FormItem className='flex items-center space-x-3 space-y-0'>
										<FormControl>
											<RadioGroupItem value='2-4' />
										</FormControl>
										<FormLabel className='font-normal'>2 تا 4 بعدازظهر</FormLabel>
									</FormItem>
									<FormItem className='flex items-center space-x-3 space-y-0'>
										<FormControl>
											<RadioGroupItem value='4-6' />
										</FormControl>
										<FormLabel className='font-normal'>4 تا 6 عصر</FormLabel>
									</FormItem>
									<FormItem className='flex items-center space-x-3 space-y-0'>
										<FormControl>
											<RadioGroupItem value='6-8' />
										</FormControl>
										<FormLabel className='font-normal'>6 تا 8 غروب</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
						</FormItem>
					)}
				/>
				<div className='flex items-center gap-5 *:flex-1'>
					<Button variant={'default'} onClick={() => onBack()} type='button'>
						بازگشت
					</Button>
					<Button variant={'default'} type='submit'>
						ادامه
					</Button>
				</div>
			</form>
		</Form>
	)
}
