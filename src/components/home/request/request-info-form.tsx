'use client'

import Button from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const infoSchema = z.object({
	firstname: z.string().min(1, { message: 'Name is required' }),
	lastname: z.string().min(1, { message: 'Name is required' }),
	email: z.string().email({ message: 'Invalid email address' }),
	phone: z.string(),
	notes: z.string().optional(),
})

type TProps = {
	onSubmit: (data: z.infer<typeof infoSchema>) => void
	onBack: () => void
}

export default function RequestInfoForm({ onSubmit, onBack }: TProps) {
	const form = useForm<z.infer<typeof infoSchema>>({
		resolver: zodResolver(infoSchema),
		defaultValues: {
			firstname: '',
			lastname: '',
			email: '',
			phone: '',
			notes: '',
		},
	})

	const infoSubmit = async (values: z.infer<typeof infoSchema>) => {
		onSubmit(values)
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(infoSubmit)} className='flex flex-col gap-10'>
				<div className='flex items-center gap-5 *:flex-1'>
					<FormField
						control={form.control}
						name='firstname'
						render={({ field }) => (
							<FormItem>
								<FormLabel>نام</FormLabel>
								<FormControl>
									<Input placeholder='مثال: محمد' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='lastname'
						render={({ field }) => (
							<FormItem>
								<FormLabel>نام خانوادگی</FormLabel>
								<FormControl>
									<Input placeholder='مثال: محمدی' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				<div className='flex items-center gap-5 *:flex-1'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>ایمیل</FormLabel>
								<FormControl>
									<Input type='email' placeholder='مثال : mohammd@gmail.com' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='phone'
						render={({ field }) => (
							<FormItem>
								<FormLabel>شماره موبایل</FormLabel>
								<FormControl>
									<Input type='number' placeholder='مثال : 09123456789' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name='notes'
					render={({ field }) => (
						<FormItem>
							<FormLabel>توضیحات</FormLabel>
							<FormControl>
								<Textarea placeholder='توضیحات اضافی در مورد شرایط بیمار' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<div className='flex items-center gap-5 *:flex-1'>
					<Button variant={'default'} onClick={() => onBack()} type='button'>
						بازگشت
					</Button>
					<Button variant={'default'} type='submit'>
						ثبت درخواست
					</Button>
				</div>
			</form>
		</Form>
	)
}
