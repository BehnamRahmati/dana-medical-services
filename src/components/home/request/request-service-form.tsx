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
import { dataFetcher } from '@/lib/helpers'
import { TService, TUser } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
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

// Wrap component with React.memo
const RequestServiceForm: React.FC<TProps> = React.memo(({ onSubmit }) => {
	const {
		data: serviceData,
		isLoading: servicesLoading,
		error: servicesError, // Add error variable for services
	} = useSWR<{ services: TService[] }>(['/api/services/menu', 'request-services'], dataFetcher)
	const {
		data: userData,
		isLoading: usersLoading,
		error: usersError, // Add error variable for users
	} = useSWR<{ users: TUser[] }>(['/api/users', 'request-users'], dataFetcher)

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
				{/* Service Select Field */}
				<FormField
					control={form.control}
					name='serviceId'
					render={({ field }) => (
						<FormItem>
							<FormLabel> خدمت</FormLabel>
							{servicesLoading ? (
								<SelectSkeleton />
							) : servicesError ? (
								<p className='text-sm text-destructive'>خطا در بارگذاری خدمات</p>
							) : (
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='یک خدمت را انتخاب کنید.' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											{serviceData?.services && serviceData.services.length > 0 ? (
												serviceData.services.map(service => (
													<SelectItem value={service.id} key={'rqsrv' + service.id}>
														{service.title}
													</SelectItem>
												))
											) : (
												<p className='p-2 text-sm text-muted-foreground'>خدمتی یافت نشد</p>
											)}
										</SelectGroup>
									</SelectContent>
								</Select>
							)}
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Expert Select Field */}
				<FormField
					control={form.control}
					name='expertId'
					render={({ field }) => (
						<FormItem>
							<FormLabel> متخصص</FormLabel>
							{usersLoading ? (
								<SelectSkeleton />
							) : usersError ? (
								<p className='text-sm text-destructive'>خطا در بارگذاری متخصصین</p>
							) : (
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='یک متخصص را انتخاب کنید.' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											{userData?.users && userData.users.length > 0 ? (
												userData.users.map(user => (
													<SelectItem value={user.id} key={user.id}>
														{user.name}
													</SelectItem>
												))
											) : (
												<p className='p-2 text-sm text-muted-foreground'>متخصصی یافت نشد</p>
											)}
										</SelectGroup>
									</SelectContent>
								</Select>
							)}
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button variant={'default'} type='submit'>
					ادامه
				</Button>
			</form>
		</Form>
	)
})

// Set display name for React DevTools
RequestServiceForm.displayName = 'RequestServiceForm'

export default RequestServiceForm
