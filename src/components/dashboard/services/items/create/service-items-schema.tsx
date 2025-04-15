import { z } from 'zod'

export const serviceItemsFormSchema = z.object({
	title: z.string().min(1, { message: 'عنوان را وارد کنید' }),
	price: z.string().min(1, { message: 'قیمت را وارد کنید' }),
	discount: z.string().min(1, { message: 'تخفیف را وارد کنید' }),
	description: z.string().min(1, { message: 'توضیحات را وارد کنید' }),
	serviceId: z.string().min(1, { message: 'خدمت را وارد کنید' }),
})
