'use client'

import { Form } from '@/components/ui/form'

import { TArticle } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { handleToastPromise } from '@/lib/helpers'
import axios from 'axios'
import { editFormSchema } from '../lib/schemas'
import EditFormMain from './edit-form-main'
import EditFormSidebar from './edit-form-sidebar'

export default function ArticlesEditForm({ article }: { article: TArticle }) {
	const [imageUrl, setImageUrl] = useState(article.thumbnail)

	const form = useForm<z.infer<typeof editFormSchema>>({
		resolver: zodResolver(editFormSchema),
		defaultValues: {
			title: article.title,
			slug: article.slug,
			excerpt: article.excerpt,
			tags: article.tags.length > 0 ? article.tags.map(x => x.id) : [],
			category: article.categoryId,
			thumbnail: '',
			read: article.read.toString(),
			author: article.userId,
			content: article.content,
			status: article.status,
		},
	})

	async function editArticle(values: z.infer<typeof editFormSchema>) {
		const formData = new FormData()
		if (values.thumbnail) {
			formData.append('thumbnail', values.thumbnail)
		}
		formData.append('title', values.title)
		formData.append('slug', values.slug)
		formData.append('excerpt', values.excerpt)
		formData.append('tags', values.tags.join(','))
		formData.append('category', values.category)
		formData.append('author', values.author)
		formData.append('read', values.read.toString())
		formData.append('content', values.content)
		formData.append('status', values.status)
		formData.append('id', article.id)

		const response = await axios.put('/api/dashboard/articles', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return new Response(JSON.stringify(response.data), {
			status: response.status,
			headers: response.headers as HeadersInit,
		})
	}

	async function onSubmit(values: z.infer<typeof editFormSchema>) {
		handleToastPromise(
			() => editArticle(values),
			'در حال بروزرسانی...',
			'مقاله با موفقیت بروزرسانی شد',
			'خطا در بروزرسانی مقاله',
		)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex flex-col md:flex-row gap-5'>
					<EditFormMain form={form} imageUrl={imageUrl} setImageUrl={setImageUrl} />
					<EditFormSidebar form={form} />
				</div>
			</form>
		</Form>
	)
}
