'use client'

import Button from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectSkeleton,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { fetchServices, fetchUsers } from '@/lib/helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { z } from 'zod'

export const serviceSchema = z.object({
	serviceId: z.string().min(1, { message: 'لطفا خدمت را انتخاب کنید' }),
	expertId: z.string().min(1, { message: 'لطفا متخصص را انتخاب کنید' }),
})

type TProps = {
	onSubmit: (data: z.infer<typeof serviceSchema>) => void
}

export default function RequestServiceForm({ onSubmit }: TProps) {
	const { data: services, isLoading: servicesLoading } = useSWR('/api/services', fetchServices)
	const { data: users, isLoading: usersLoading } = useSWR('/api/users', fetchUsers)
	const form = useForm<z.infer<typeof serviceSchema>>({
		resolver: zodResolver(serviceSchema),
		defaultValues: { serviceId: '', expertId: '' },
	})
	const serviceSubmit = async (values: z.infer<typeof serviceSchema>) => {
		onSubmit(values)
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(serviceSubmit)} className='flex flex-col gap-10'>
				{servicesLoading || !services ? (
					<SelectSkeleton />
				) : (
					<FormField
						control={form.control}
						name='serviceId'
						render={({ field }) => (
							<FormItem>
								<FormLabel> خدمت</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='یک خدمت را انتخاب کنید.' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											{services.length
												? services.map(service => (
														<SelectItem value={service.id} key={service.id}>
															{service.title}
														</SelectItem>
													))
												: null}
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				{usersLoading || !users ? (
					<SelectSkeleton />
				) : (
					<FormField
						control={form.control}
						name='expertId'
						render={({ field }) => (
							<FormItem>
								<FormLabel> متخصص</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='یک متخصص را انتخاب کنید.' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											{users.length
												? users.map(user => (
														<SelectItem value={user.id} key={user.id}>
															{user.name}
														</SelectItem>
													))
												: null}
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<Button variant={'default'} type='submit'>
					ادامه
				</Button>
			</form>
		</Form>
	)
}
