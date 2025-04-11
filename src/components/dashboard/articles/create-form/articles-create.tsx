'use client'
import { Form } from '@/components/ui/form'

import { TCategory, TTag, TUser } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { z } from 'zod'
import CreateFormMain from './create-form-main'
import { createFormSchema } from './create-form-schema'
import CreateFormSidebar from './create-form-sidebar'

async function dataFetcher<T>(url: string): Promise<T> {
	const response = await axios.get(url)
	return await response.data
}

export default function ArticlesCreateForm() {
	const { data: tagsData, isLoading: tagsLoading } = useSWR<{ tags: TTag[] }>('/api/dashboard/tags', dataFetcher)
	const { data: categoriesData, isLoading: categoriesLoading } = useSWR<{ categories: TCategory[] }>(
		'/api/dashboard/categories',
		dataFetcher,
	)
	const { data: usersData, isLoading: usersLoading } = useSWR<{ users: TUser[] }>('/api/dashboard/users', dataFetcher)
	const [imageUrl, setImageUrl] = useState('')
	const router = useRouter()
	const form = useForm<z.infer<typeof createFormSchema>>({
		resolver: zodResolver(createFormSchema),
		defaultValues: {
			title: '',
			slug: '',
			excerpt: '',
			tag: '',
			category: '',
			thumbnail: '',
			readTime: '0',
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
		formData.append('readTime', values.readTime.toString())
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
			await createArticle(values)
			router.refresh()
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmitToNewArticle)}>
				<div className='flex flex-col md:flex-row gap-5'>
					{<CreateFormMain form={form} imageUrl={imageUrl} setImageUrl={setImageUrl} />}
					<CreateFormSidebar
						form={form}
						tagsData={tagsData}
						tagsLoading={tagsLoading}
						categoriesData={categoriesData}
						categoriesLoading={categoriesLoading}
						usersData={usersData}
						usersLoading={usersLoading}
					/>
				</div>
			</form>
		</Form>
	)
}
