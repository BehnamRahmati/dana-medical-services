'use client'

import { cn } from '@/lib/utils'
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import * as React from 'react'
import { DayPicker } from 'react-day-picker/persian'
import 'react-day-picker/style.css'
import { buttonVariants } from './button'

function Calendar({ className, classNames, showOutsideDays = true, ...props }: React.ComponentProps<typeof DayPicker>) {
	return (
		<DayPicker
			animate
			showOutsideDays={showOutsideDays}
			className={cn('p-3', className)}
			classNames={{
				months: 'flex flex-col sm:flex-row gap-2',
				month: 'flex flex-col gap-4',
				month_caption: 'flex justify-center pt-1 relative items-center w-full',
				caption_label: 'text-sm font-medium',
				month_grid: 'w-full border-collapse space-x-1',
				weekdays: 'flex',
				weekday: 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
				week: 'flex w-full mt-2',
				day: cn(
					'relative p-0 text-center text-base focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md',
					props.mode === 'range'
						? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
						: '[&:has([aria-selected])]:rounded-md',
				),
				day_button: cn(buttonVariants({ variant: 'ghost' }), 'size-8 p-0 font-normal aria-selected:opacity-100'),
				range_start: 'day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground',
				range_end: 'day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground',
				selected:
					'bg-primary rounded-md text-white hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
				today: 'bg-accent text-accent-foreground',
				outside: 'day-outside text-muted-foreground aria-selected:text-muted-foreground',
				disabled: 'text-muted-foreground opacity-50',
				range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
				hidden: 'invisible',
				...classNames,
			}}
			components={{
				NextMonthButton: ({ className, ...props }) => (
					<button type='button' className={cn('*:size-4 *:stroke-content z-10', className)} {...props}>
						<ArrowLeft2 />
					</button>
				),
				PreviousMonthButton: ({ className, ...props }) => (
					<button type='button' className={cn('*:size-4 *:stroke-content z-10', className)} {...props}>
						<ArrowRight2 />
					</button>
				),
			}}
			{...props}
		/>
	)
}

export { Calendar }
