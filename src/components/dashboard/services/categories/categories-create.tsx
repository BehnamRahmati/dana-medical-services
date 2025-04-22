'use client'

import Button from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TCategory } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { KeyedMutator } from 'swr'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string().min(1, { message: 'hi' }),
	slug: z.string().min(1, { message: 'hi' }),
})
export default function ServicesCategroriesCreate({
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

	async function createServiceCategory(values: z.infer<typeof formSchema>) {
		return await fetch('/api/dashboard/services/categories', {
			method: 'POST',
			body: JSON.stringify(values),
		})
	}

	async function onSubmit(values: z.infer<typeof formSchema>) {
		toast.promise(createServiceCategory(values), {
			loading: 'در حال ایجاد دسته بندی جدید...',
			success: async response => {
				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData || `خطا در ایجاد دسته بندی  ${response.status}`)
				}
				form.reset()
				mutate()
				return 'دسته بندی جدید با موفقیت ایجاد شد'
			},
			error: error => {
				console.error('Error submitting comment:', error)
				return ` خطا در ایجاد دسته بندی جدید : ${error.message || 'Please try again.'}`
			},
		})
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
					<DialogTitle>فرم ساخت دسته بندی</DialogTitle>
					<DialogDescription className='hidden'>دیالوگ ساخت دسته بندی</DialogDescription>
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
