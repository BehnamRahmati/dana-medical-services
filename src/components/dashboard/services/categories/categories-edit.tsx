'use client'

import Button from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
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

	async function editCategories(values: z.infer<typeof formSchema>) {
		return await fetch('/api/dashboard/services/categories', {
			method: 'PUT',
			body: JSON.stringify(values),
		})
	}

	async function onSubmit(values: z.infer<typeof formSchema>) {
		toast.promise(editCategories(values), {
			loading: 'در حال بروزرسانی دسته بندی...',
			success: async response => {
				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData || `خطا در ایجاد برچسب  ${response.status}`)
				}
				form.reset()
				mutate(['/api/dashboard/services/categories', 'services-categories'])
				return 'دسته بندی با موفقیت بروزرسانی شد'
			},
			error: error => {
				console.error('Error submitting comment:', error)
				return ` خطا در بروزرسانی برچسب : ${error.message || 'Please try again.'}`
			},
		})
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
