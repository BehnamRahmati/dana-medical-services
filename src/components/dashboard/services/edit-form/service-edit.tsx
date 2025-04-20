'use client'

import { Form } from '@/components/ui/form'
import { TService } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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

		return await axios.put('/api/dashboard/services', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	}

	async function onSubmit(values: z.infer<typeof editServiceSchema>) {
		toast.promise(editService(values), {
			loading: 'در حال ویرایش خدمت...',
			success: 'خدمت با موفقیت ویرایش شد.',
			error: 'خدمت ویرایش نشد.',
		})
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
