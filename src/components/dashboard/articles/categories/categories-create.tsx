'use client'

import Button from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string().min(1, { message: 'hi' }),
	slug: z.string().min(1, { message: 'hi' }),
})
export default function CategroriesCreate() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			slug: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const response = await axios.post('/api/dashboard/categories', values)
			console.warn(response.data)
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<div className='lg:w-80 h-full bg-accent rounded-lg p-5'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-10'>
					<FormField
						name='name'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>عنوان تگ</FormLabel>
								<FormControl>
									<Input placeholder='name' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name='slug'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>پیوند یکتا</FormLabel>
								<FormControl>
									<Input placeholder='slug' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						disabled={form.formState.isSubmitting}
						variant='default'
						size='lg'
						className='text-lg shrink-0 cursor-pointer'
					>
						ایجاد دسته بندی جدید
					</Button>
				</form>
			</Form>
		</div>
	)
}
