'use client'

import Button from '@/components/ui/button'
import QuillEditor from '@/components/ui/editor'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { TUser } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { z } from 'zod'

const formSchema = z.object({
	title: z.string(),
	slug: z.string(),
	excerpt: z.string(),
	author: z.string(),
	tag: z.string(),
	readTime: z.string(),
	category: z.string(),
	thumbnail: z.any(),
})
async function userFetcher(url: string): Promise<TUser[]> {
	const response = await axios.get(url)
	return await response.data.users
}

export default function ServiceCreateForm() {
	const { data: usersData, isLoading: usersLoading } = useSWR('/api/dashboard/users', userFetcher)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			slug: '',
			excerpt: '',
			tag: '',
			category: '',
			thumbnail: '',
			readTime: '',
			author: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.warn(values)
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='bg-accent border border-border p-5 rounded-lg flex flex-col gap-10'
			>
				<div className='bg-background w-full h-96 rounded-lg'></div>
				<FormField
					control={form.control}
					name='thumbnail'
					render={({ field }) => (
						<FormItem>
							<FormLabel>تصویر مقاله:</FormLabel>
							<FormControl>
								<Input type='file' placeholder='جستجو در محتوای سایت' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>عنوان مقاله:</FormLabel>
							<FormControl>
								<Input type='text' placeholder='جستجو در محتوای سایت' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='slug'
					render={({ field }) => (
						<FormItem>
							<FormLabel>پیوند مقاله:</FormLabel>
							<FormControl>
								<Input type='text' placeholder='جستجو در محتوای سایت' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='excerpt'
					render={({ field }) => (
						<FormItem>
							<FormLabel>توضیح کوتاه مقاله:</FormLabel>
							<FormControl>
								<Textarea placeholder='جستجو در محتوای سایت' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				{usersLoading ? (
					<p>loading</p>
				) : (
					<FormField
						control={form.control}
						name='author'
						render={({ field }) => (
							<FormItem>
								<FormLabel> نویسنده مقاله:</FormLabel>
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
							</FormItem>
						)}
					/>
				)}

				<div>
					<p>محتوای مقاله:</p>
					<QuillEditor />
				</div>
				<div className='flex items-end gap-10 *:flex-1'>
					<FormField
						control={form.control}
						name='readTime'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									<p>زمان مطالعه مقاله:</p>
								</FormLabel>
								<FormControl>
									<Input type='number' placeholder='جستجو در محتوای سایت' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<Button type='submit' variant='default' size='lg' className='shrink-0 hover:bg-transparent cursor-pointer'>
						submit
					</Button>
				</div>
			</form>
		</Form>
	)
}
