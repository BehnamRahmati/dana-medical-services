'use client'

import Button from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Edit } from 'iconsax-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useSWRConfig } from 'swr'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string().min(1, { message: 'hi' }),
	slug: z.string().min(1, { message: 'hi' }),
	id: z.string().min(1, { message: 'hi' }),
})
export default function ServicesCategroriesEdit({ name, slug, id }: { name: string; slug: string; id: string }) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: name,
			slug: slug,
			id: id,
		},
	})
	const { mutate } = useSWRConfig()

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			toast('در حال ایجاد دسته بندی جدید...', { icon: '⏳' })
			await axios.put('/api/dashboard/services/categories', values)
			toast('دسته بندی جدید با موفقیت ایجاد شد', { icon: '✅' })
			form.reset()
			mutate(['/api/dashboard/services/categories', 'services-categories'])
		} catch (error) {
			console.error(error)
			toast('خطا در ایجاد دسته بندی جدید', { icon: '❌' })
		}
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'ghost'} className='py-1'>
					<Edit className='stroke-content size-5' variant='Broken' />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>فرم ویرایش دسته بندی</DialogTitle>
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
							بروزرسانی دسته بندی
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
