'use client'

import DashboardServicesSelect from '@/components/dashboard/form/services-select'
import Button from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import TiptapEditor from '@/components/ui/tiptap-editor'
import { handleToastPromise } from '@/lib/helpers'
import { TServiceItem } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { KeyedMutator } from 'swr'
import { z } from 'zod'
import { serviceItemsFormSchema } from './service-items-schema'

export default function ServiceItemsCreateForm({
	mutate,
}: {
	mutate: KeyedMutator<{
		serviceItems: TServiceItem[]
	}>
}) {
	const form = useForm<z.infer<typeof serviceItemsFormSchema>>({
		resolver: zodResolver(serviceItemsFormSchema),
		defaultValues: {
			title: '',
			price: '0',
			discount: '0',
			description: '',
			serviceId: '',
		},
	})

	async function createItem(values: z.infer<typeof serviceItemsFormSchema>) {
		return await fetch('/api/dashboard/services/items', {
			method: 'POST',
			body: JSON.stringify(values),
		})
	}

	const onSubmit = async (values: z.infer<typeof serviceItemsFormSchema>) => {
		handleToastPromise(
			() => createItem(values),
			'در حال ایجاد ایتم جدید...',
			'ایتم جدید با موفقیت ایجاد شد',
			' خطا در ایجاد ایتم جدید ',
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
					ساخت آیتم جدید
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>ساخت ایتم خدمت جدید</DialogTitle>
					<DialogDescription className='hidden'>دیالوگ ساخت آیتم جدید</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-10 service-item'>
						<div className='flex *:flex-1 gap-5'>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem>
										<FormLabel>عنوان</FormLabel>
										<FormControl>
											<Input {...field} placeholder='عنوان' />
										</FormControl>
									</FormItem>
								)}
							/>
							<DashboardServicesSelect form={form} label='خدمت' />
						</div>
						<div className='flex *:flex-1 gap-5'>
							<FormField
								control={form.control}
								name='price'
								render={({ field }) => (
									<FormItem>
										<FormLabel>قیمت</FormLabel>
										<FormControl>
											<Input type='number' {...field} placeholder='قیمت' />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='discount'
								render={({ field }) => (
									<FormItem>
										<FormLabel>تخفیف</FormLabel>
										<FormControl>
											<Input type='number' {...field} placeholder='تخفیف' />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>توضیحات</FormLabel>
									<FormControl>
										{/* <QuillEditor onChangeEditor={field.onChange} editorValue={field.value} /> */}
										<TiptapEditor onChange={field.onChange} value={field.value} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' variant={'default'}>
							ثبت
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
