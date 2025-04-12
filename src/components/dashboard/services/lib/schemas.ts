import { z } from 'zod'

const MAX_FILE_SIZE = 20000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const createServiceSchema = z.object({
	title: z.string().min(1, { message: 'یک عنوان برای مقاله وارد کنید' }),
	slug: z.string().min(1, { message: 'یک پیوند برای مقاله وارد کنید' }),
	excerpt: z.string().min(1, { message: 'توضیحی کوتاه برای مقاله وارد کنید' }),
	author: z.string().min(1, { message: 'نویسنده مقاله را انتخاب کنید' }),
	readTime: z.string().min(1, { message: 'زمان مطالعه مقاله را وارد کنید' }),
	content: z.string().min(1, { message: 'محتوای مقاله را وارد کنید' }),
	category: z.string().min(1, { message: 'دسته بندی مقاله را انتخاب کنید' }),
	status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'], {
		errorMap: () => ({ message: 'وضعیت مقاله را انتخاب کنید' }),
	}),
	thumbnail: z
		.any()
		.refine(file => file?.size <= MAX_FILE_SIZE, `حجم فایل باید کمتر از ${MAX_FILE_SIZE / 1000000} مگابایت باشد`)
		.refine(file => file?.size > 0, 'فایل را انتخاب کنید')
		.refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.type), 'فقط فایل های jpg, png, jpeg مجاز هستند'),
})

const editServiceSchema = z.object({
	title: z.string().min(1, { message: 'یک عنوان برای مقاله وارد کنید' }),
	slug: z.string().min(1, { message: 'یک پیوند برای مقاله وارد کنید' }),
	excerpt: z.string().min(1, { message: 'توضیحی کوتاه برای مقاله وارد کنید' }),
	author: z.string().min(1, { message: 'نویسنده مقاله را انتخاب کنید' }),
	readTime: z.string().min(1, { message: 'زمان مطالعه مقاله را وارد کنید' }),
	content: z.string().min(1, { message: 'محتوای مقاله را وارد کنید' }),
	status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'], {
		errorMap: () => ({ message: 'وضعیت مقاله را انتخاب کنید' }),
	}),
	thumbnail: z.any(),
	category: z.string().min(1, { message: 'دسته بندی مقاله را انتخاب کنید' }),
})

export { createServiceSchema, editServiceSchema }
