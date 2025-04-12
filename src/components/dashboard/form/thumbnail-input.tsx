import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FolderAdd } from 'iconsax-react'
import Image from 'next/image'
import React from 'react'
import { Path, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { createFormSchema, editFormSchema } from '../articles/lib/schemas'
import { createServiceSchema, editServiceSchema } from '../services/lib/schemas'

// Define a union type of all supported schemas
type SupportedSchema =
	| z.infer<typeof createFormSchema>
	| z.infer<typeof editFormSchema>
	| z.infer<typeof createServiceSchema>
	| z.infer<typeof editServiceSchema>

// Generic type that ensures T has a title field and is one of our supported schemas
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TProps<T extends SupportedSchema & { thumbnail?: any }> = {
	form: UseFormReturn<T>
	imageUrl: string
	setImageUrl: React.Dispatch<React.SetStateAction<string>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DashboardThumbnail<T extends SupportedSchema & { thumbnail?: any }>({
	form,
	imageUrl,
	setImageUrl,
}: TProps<T>) {
	return (
		<FormField
			control={form.control}
			name={'thumbnail' as Path<T>}
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
	)
}
