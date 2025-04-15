'use client'
import Button from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TLink } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string().min(1, { message: 'required' }),
	url: z.string().min(1, { message: 'required' }),
	menu: z.string().min(1, { message: 'required' }),
})

async function tagFetcher(url: string): Promise<{ menus: TLink[] }> {
	const response = await axios.get(url)
	return await response.data
}

export default function LinkCreateForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			url: '',
			menu: '',
		},
	})

	const { data: menuData, isLoading: menuLoading } = useSWR('/api/dashboard/menus', tagFetcher)

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const response = await axios.post('/api/dashboard/menus/links', values)
			console.warn(response.data)
		} catch (error) {
			console.warn(error)
		}
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'default'} className='py-1'>
					ساخت لینک جدید
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>فرم ساخت لینک </DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>عنوان لینک</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='url'
							render={({ field }) => (
								<FormItem>
									<FormLabel>آدرس لینک</FormLabel>
									<FormControl>
										<Input dir='ltr' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						{menuLoading || !menuData || !menuData.menus ? (
							<p>loading</p>
						) : (
							<FormField
								control={form.control}
								name='menu'
								render={({ field }) => (
									<FormItem>
										<FormLabel> منو</FormLabel>
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
							ثبت لینک جدید
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
