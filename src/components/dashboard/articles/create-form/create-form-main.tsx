import QuillEditor from '@/components/ui/editor'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FolderAdd } from 'iconsax-react'
import Image from 'next/image'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { createFormSchema } from './create-form-schema'

type TProps = {
	form: UseFormReturn<z.infer<typeof createFormSchema>>
	imageUrl: string
	setImageUrl: React.Dispatch<React.SetStateAction<string>>
}

export default function CreateFormMain({ form, imageUrl, setImageUrl }: TProps) {
	return (
		<div className='flex-1 bg-accent p-5 rounded-lg flex flex-col gap-10'>
			<FormField
				control={form.control}
				name='thumbnail'
				render={({ field: { onChange, value, ...field } }) => (
					<FormItem>
						<FormLabel>
							<div className=' w-full h-96 rounded-lg overflow-hidden relative'>
								{imageUrl && (
									<Image src={imageUrl} className='mx-auto h-full w-auto' alt={'hi'} width={600} height={300} />
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
						<FormLabel>عنوان مقاله:</FormLabel>
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
						<FormLabel>پیوند مقاله:</FormLabel>
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
						<FormLabel>توضیح کوتاه مقاله:</FormLabel>
						<FormControl>
							<Textarea placeholder='جستجو در محتوای سایت' {...field} />
						</FormControl>
						<FormDescription>توضیح کوتاه مقاله در صفحه اصلی و لیست مقالات نمایش داده می شود.</FormDescription>
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
							<p>محتوای مقاله:</p>
						</FormLabel>
						<FormControl>
							<QuillEditor onChangeEditor={field.onChange} editorValue={field.value} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	)
}
