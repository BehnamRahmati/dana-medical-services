'use client'

import Button from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TCategory } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { KeyedMutator } from 'swr'
import { z } from 'zod'
const formSchema = z.object({
	name: z.string().min(1, { message: 'عنوان دسته بندی نمی تواند خالی باشد.' }),
	slug: z.string().min(1, { message: 'پیوند یکتای دسته بندی نمی تواند خالی باشد.' }),
})
export default function CategroriesCreate({
	mutate,
}: {
	mutate: KeyedMutator<{
		categories: TCategory[]
	}>
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			slug: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			toast('در حال ایجاد دسته بندی', { icon: '⏳' })
			await axios.post('/api/dashboard/categories', values)
			toast('دسته بندی با موفقیت ایجاد شد', { icon: '✅' })
			form.reset()
			mutate()
		} catch (error) {
			console.error(error)
			toast('خطا در ایجاد دسته بندی', { icon: '❌' })
		}
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'default'} className='py-1'>
					ساخت دسته بندی جدید
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>فرم ساخت دسته بندی مقالات</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-10'>
						<FormField
							name='name'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>عنوان دسته بندی</FormLabel>
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
			</DialogContent>
		</Dialog>
	)
}
