'use client'

import { Form } from '@/components/ui/form'
import { handleToastPromise } from '@/lib/helpers'
import { TService } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { editServiceSchema } from '../lib/schemas'
import EditServiceFormMain from './service-edit-main'
import EditServiceFormSidebar from './service-edit-sidebar'

export default function ServiceEditForm({ service }: { service: TService }) {
	const [imageUrl, setImageUrl] = useState(service.thumbnail)
	const form = useForm<z.infer<typeof editServiceSchema>>({
		resolver: zodResolver(editServiceSchema),
		defaultValues: {
			title: service.title,
			slug: service.slug,
			excerpt: service.excerpt,
			thumbnail: '',
			read: service.read.toString(),
			author: service.userId,
			content: service.content,
			status: service.status,
			category: service.categoryId || '',
		},
	})

	async function editService(values: z.infer<typeof editServiceSchema>) {
		const formData = new FormData()
		if (values.thumbnail) {
			formData.append('thumbnail', values.thumbnail)
		}
		formData.append('title', values.title)
		formData.append('slug', values.slug)
		formData.append('excerpt', values.excerpt)
		formData.append('author', values.author)
		formData.append('read', values.read.toString())
		formData.append('content', values.content)
		formData.append('status', values.status)
		formData.append('category', values.category)

		const response = await axios.put('/api/dashboard/services', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return new Response(JSON.stringify(response.data), {
			status: response.status,
			headers: response.headers as HeadersInit,
		})
	}

	async function onSubmit(values: z.infer<typeof editServiceSchema>) {
		handleToastPromise(() => editService(values), 'در حال ویرایش خدمت...', 'خدمت با موفقیت ویرایش شد.', 'خدمت ویرایش نشد.')
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex flex-col md:flex-row gap-5'>
					<EditServiceFormMain form={form} imageUrl={imageUrl} setImageUrl={setImageUrl} />
					<EditServiceFormSidebar form={form} />
				</div>
			</form>
		</Form>
	)
}
