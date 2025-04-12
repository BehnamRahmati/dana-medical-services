import Button from '@/components/ui/button'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import DashboardCategoriesSelect from '../../form/categories-select'
import DashboardReadTimeInput from '../../form/readTime-input'
import DashboardStatusSelect from '../../form/status-select'
import DashboardUsersSelect from '../../form/users-select'
import { editServiceSchema } from '../lib/schemas'

type TProps = {
	form: UseFormReturn<z.infer<typeof editServiceSchema>>
}

export default function EditServiceFormSidebar({ form }: TProps) {
	return (
		<div className='md:w-80 flex flex-col gap-10 bg-accent p-5 rounded-lg'>
			<DashboardCategoriesSelect label='دسته بندی خدمت :' form={form} />
			<DashboardUsersSelect label='نویسنده خدمت :' form={form} />
			<DashboardReadTimeInput label='زمان مطالعه خدمت :' form={form} />
			<DashboardStatusSelect label='وضعیت خدمت :' form={form} />

			<Button
				type='submit'
				disabled={form.formState.isSubmitting}
				variant='default'
				size='lg'
				className='text-lg shrink-0 cursor-pointer'
			>
				بروزرسانی مقاله
			</Button>
			{form.formState.isSubmitSuccessful && <p className='text-primary'>با موفقیت مقاله جدید ثبت شد</p>}
		</div>
	)
}
