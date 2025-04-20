'use client'

import Button from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { handleToastPromise } from '@/lib/helpers'
import { TTag } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { KeyedMutator } from 'swr'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string().min(1, { message: 'عنوان برچسب نمی تواند خالی باشد' }),
	slug: z.string().min(1, { message: 'پیوند یکتای برچسب نمی تواند خالی باشد' }),
})
export default function TagsCreate({
	mutate,
}: {
	mutate: KeyedMutator<{
		tags: TTag[]
	}>
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			slug: '',
		},
	})

	async function createTag(values: z.infer<typeof formSchema>) {
		return await fetch('/api/dashboard/tags', {
			method: 'POST',
			body: JSON.stringify(values),
		})
	}

	async function onSubmit(values: z.infer<typeof formSchema>) {
		handleToastPromise(
			() => createTag(values),
			'در حال ایجاد برچسب جدید...',
			'برچسب جدید با موفقیت ایجاد شد',
			'خطا در ایجاد  برچسب ',
			() => {
				form.reset()
				mutate()
			},
		)
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'default'} className='py-1'>
					ساخت برچسب جدید
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>ساخت برچسب مقالات</DialogTitle>
				</DialogHeader>
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
							ایجاد برچسب جدید
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
