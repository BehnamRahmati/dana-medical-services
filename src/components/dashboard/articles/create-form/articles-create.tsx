'use client'
import { Form } from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { createFormSchema } from '../lib/schemas'
import CreateFormMain from './create-form-main'
import CreateFormSidebar from './create-form-sidebar'

export default function ArticlesCreateForm() {
	const [imageUrl, setImageUrl] = useState('')

	const form = useForm<z.infer<typeof createFormSchema>>({
		resolver: zodResolver(createFormSchema),
		defaultValues: {
			title: '',
			slug: '',
			excerpt: '',
			tag: '',
			category: '',
			thumbnail: '',
			read: '0',
			author: '',
			content: '',
			status: 'DRAFT',
		},
	})

	async function createArticle(values: z.infer<typeof createFormSchema>) {
		const formData = new FormData()
		formData.append('thumbnail', values.thumbnail)
		formData.append('title', values.title)
		formData.append('slug', values.slug)
		formData.append('excerpt', values.excerpt)
		formData.append('tag', values.tag)
		formData.append('category', values.category)
		formData.append('author', values.author)
		formData.append('read', values.read.toString())
		formData.append('content', values.content)
		formData.append('status', values.status)
		return await axios.post('/api/dashboard/articles', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	}

	async function onSubmitToNewArticle(values: z.infer<typeof createFormSchema>) {
		try {
			toast('در حال انتشار مقاله...', { icon: '⏳' })
			await createArticle(values)
			toast('مقاله با موفقیت منتشر شد.', { icon: '✅' })
			form.reset()
		} catch (error) {
			console.error(error)
			toast('مقاله منتشر نشد. دوباره تلاش کنید.', { icon: '❌' })
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmitToNewArticle)}>
				<div className='flex flex-col md:flex-row gap-5'>
					{<CreateFormMain form={form} imageUrl={imageUrl} setImageUrl={setImageUrl} />}
					<CreateFormSidebar form={form} />
				</div>
			</form>
		</Form>
	)
}
