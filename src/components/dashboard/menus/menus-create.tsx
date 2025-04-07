'use client'
import Button from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TMenu } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string().min(1, { message: 'required' }),
	parent: z.string(),
})

async function tagFetcher(url: string): Promise<{ menus: TMenu[] }> {
	const response = await axios.get(url)
	return await response.data
}

export default function MenuCreateForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			parent: '',
		},
	})
	const router = useRouter()

	const { data: menuData, isLoading: menuLoading } = useSWR('/api/dashboard/menus', tagFetcher)

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			await axios.post('/api/dashboard/menus', values)
			router.replace('/dashboard/menus')
		} catch (error) {
			console.warn(error)
		}
	}
	return (
		<div className='rounded-lg p-5 bg-accent mb-5'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5 '>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>عنوان منو</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					{menuLoading || !menuData || !menuData.menus ? (
						<p>loading</p>
					) : (
						<FormField
							control={form.control}
							name='parent'
							render={({ field }) => (
								<FormItem>
									<FormLabel> منوی والد</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='choose a tag' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												{menuData.menus.length &&
													menuData.menus.map(tag => (
														<SelectItem value={tag.id} key={tag.id}>
															{tag.name}
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
					<Button variant={'default'} size={'lg'} className='w-full'>
						ثبت منو جدید
					</Button>
				</form>
			</Form>
		</div>
	)
}
