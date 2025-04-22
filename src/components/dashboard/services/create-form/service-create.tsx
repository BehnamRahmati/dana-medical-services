'use client'

import { Form } from '@/components/ui/form'
import { handleToastPromise } from '@/lib/helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createServiceSchema } from '../lib/schemas'
import CreateServiceFormMain from './service-create-main'
import CreateServiceFormSidebar from './service-create-sidebar'

export default function ServiceCreateForm() {
	const [imageUrl, setImageUrl] = useState('')
	const form = useForm<z.infer<typeof createServiceSchema>>({
		resolver: zodResolver(createServiceSchema),
		defaultValues: {
			title: '',
			slug: '',
			excerpt: '',
			thumbnail: '',
			read: '',
			author: '',
			content: '',
			status: 'DRAFT',
			category: '',
		},
	})

	async function createService(values: z.infer<typeof createServiceSchema>) {
		const formData = new FormData()
		formData.append('thumbnail', values.thumbnail)
		formData.append('title', values.title)
		formData.append('slug', values.slug)
		formData.append('excerpt', values.excerpt)
		formData.append('author', values.author)
		formData.append('read', values.read.toString())
		formData.append('content', values.content)
		formData.append('status', values.status)
		formData.append('category', values.category)
		const response = await axios.post('/api/dashboard/services', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return new Response(JSON.stringify(response.data), {
			status: response.status,
			headers: response.headers as HeadersInit,
		})
	}

	async function onSubmit(values: z.infer<typeof createServiceSchema>) {
		handleToastPromise(
			() => createService(values),
			'در حال ایجاد خدمت...',
			'خدمت با موفقیت ایجاد شد.',
			'خدمت ایجاد نشد. دوباره تلاش کنید.',
			() => {
				window.location.reload()
			},
		)
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex flex-col md:flex-row gap-5'>
					<CreateServiceFormMain form={form} imageUrl={imageUrl} setImageUrl={setImageUrl} />
					<CreateServiceFormSidebar form={form} />
				</div>
			</form>
		</Form>
	)
}
