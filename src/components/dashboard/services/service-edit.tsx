'use client'

import Button from '@/components/ui/button'
import QuillEditor from '@/components/ui/editor'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { TServices, TUser } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { FolderAdd } from 'iconsax-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { z } from 'zod'

const formSchema = z.object({
	title: z.string().min(1, { message: 'یک عنوان برای مقاله وارد کنید' }),
	slug: z.string().min(1, { message: 'یک پیوند برای مقاله وارد کنید' }),
	excerpt: z.string().min(1, { message: 'توضیحی کوتاه برای مقاله وارد کنید' }),
	author: z.string().min(1, { message: 'نویسنده مقاله را انتخاب کنید' }),
	readTime: z.number().min(1, { message: 'زمان مطالعه مقاله را وارد کنید' }),
	content: z.string().min(1, { message: 'محتوای مقاله را وارد کنید' }),
	status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'], {
		errorMap: () => ({ message: 'وضعیت مقاله را انتخاب کنید' }),
	}),
	thumbnail: z.any(),
})
async function userFetcher(url: string): Promise<TUser[]> {
	const response = await axios.get(url)
	return await response.data.users
}

export default function ServiceEditForm({ service }: { service: TServices }) {
	const { data: usersData, isLoading: usersLoading } = useSWR('/api/dashboard/users', userFetcher)
	const [imageUrl, setImageUrl] = useState(service.thumbnail || '')
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: service.title,
			slug: service.slug,
			excerpt: service.excerpt,
			thumbnail: '',
			readTime: service.readTime,
			author: service.userId,
			content: service.content,
			status: service.status,
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const formData = new FormData()
		if (values.thumbnail) {
			formData.append('thumbnail', values.thumbnail)
		}
		formData.append('title', values.title)
		formData.append('slug', values.slug)
		formData.append('excerpt', values.excerpt)
		formData.append('author', values.author)
		formData.append('readTime', values.readTime.toString())
		formData.append('content', values.content)
		formData.append('status', values.status)

		try {
			const response = await axios.post('/api/dashboard/services', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			console.warn(response.data)
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex flex-col md:flex-row gap-5'>
					<div className='flex-1 bg-accent p-5 rounded-lg flex flex-col gap-10'>
						<FormField
							control={form.control}
							name='thumbnail'
							render={({ field: { onChange, value, ...field } }) => (
								<FormItem>
									<FormLabel>
										<div className=' w-full h-96 rounded-lg overflow-hidden relative'>
											{imageUrl && (
												<Image
													src={imageUrl}
													className='mx-auto h-full w-auto'
													alt={'hi'}
													width={600}
													height={300}
												/>
											)}
											<div className='absolute top-0 lef-0 z-10 bg-background/50 w-full h-full border-4 border-input border-dashed flex flex-col items-center justify-center'>
												<FolderAdd className='stroke-content/70 size-16 mb-2' variant='Broken' />
												<p>برای اپلود تصویر کلیک کنید</p>
											</div>
										</div>
									</FormLabel>
									<FormControl>
										<Input
											type='file'
											hidden
											accept='image/*'
											value={value?.filename}
											onChange={e => {
												if (e.target.files) {
													const url = URL.createObjectURL(e.target.files[0])
													setImageUrl(url)
													onChange(e.target.files[0])
												}
											}}
											placeholder='جستجو در محتوای سایت'
											{...field}
										/>
									</FormControl>
									<FormDescription>فایل های مجاز: jpg, png, jpeg</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>عنوان خدمت:</FormLabel>
									<FormControl>
										<Input type='text' placeholder='جستجو در محتوای سایت' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='slug'
							render={({ field }) => (
								<FormItem>
									<FormLabel>پیوند خدمت:</FormLabel>
									<FormControl>
										<Input type='text' placeholder='جستجو در محتوای سایت' {...field} />
									</FormControl>
									<FormDescription>
										پیوند یکتا برای آدرس مقاله استفاده می شود و باید به زبان انگلیسی و بدون فاصله باشد.
									</FormDescription>
									<FormDescription>مثال: my-first-article</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='excerpt'
							render={({ field }) => (
								<FormItem>
									<FormLabel>توضیح کوتاه خدمت:</FormLabel>
									<FormControl>
										<Textarea placeholder='جستجو در محتوای سایت' {...field} />
									</FormControl>
									<FormDescription>
										توضیح کوتاه خدمت در صفحه اصلی و لیست خدمات نمایش داده می شود.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='content'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										<p>محتوای خدمت:</p>
									</FormLabel>
									<FormControl>
										<QuillEditor onChangeEditor={field.onChange} editorValue={field.value} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='w-full md:w-80 flex flex-col gap-10 bg-accent p-5 rounded-lg'>
						{usersLoading ? (
							<p>loading</p>
						) : (
							<FormField
								control={form.control}
								name='author'
								render={({ field }) => (
									<FormItem>
										<FormLabel> نویسنده خدمت:</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='choose a user' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													{usersData &&
														usersData.map(user => (
															<SelectItem value={user.id} key={user.id}>
																{user.name}
															</SelectItem>
														))}
												</SelectGroup>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<FormField
							control={form.control}
							name='readTime'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										<p>زمان مطالعه خدمت:</p>
									</FormLabel>
									<FormControl>
										<Input type='number' placeholder='جستجو در محتوای سایت' {...field} />
									</FormControl>
									<FormDescription>زمان مطالعه خدمت به دقیقه محاسبه می شود.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='status'
							render={({ field }) => (
								<FormItem>
									<FormLabel> وضعیت خدمت :</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
										<FormControl>
											<SelectTrigger className='w-full'>
												<SelectValue />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												<SelectItem value='DRAFT'>پیش نویس</SelectItem>
												<SelectItem value='PUBLISHED'>منتشر شده</SelectItem>
												<SelectItem value='ARCHIVED'>بایگانی شده</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormDescription>وضعیت خدمت را انتخاب کنید.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' variant='default' size='lg' className='text-lg shrink-0 cursor-pointer'>
							بروزرسانی خدمت جدید
						</Button>
					</div>
				</div>
			</form>
		</Form>
	)
}
