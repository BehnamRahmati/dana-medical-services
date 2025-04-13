import Button from '@/components/ui/button'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import DashboardCategoriesSelect from '../../form/categories-select'
import DashboardReadTimeInput from '../../form/readTime-input'
import DashboardStatusSelect from '../../form/status-select'
import DashboardTagsSelect from '../../form/tags-select'
import DashboardUsersSelect from '../../form/users-select'
import { createFormSchema } from '../lib/schemas'

interface ArticleSidebarProps {
	form: UseFormReturn<z.infer<typeof createFormSchema>>
}

export default function CreateFormSidebar({ form }: ArticleSidebarProps) {
	return (
		<div className='w-full md:w-80 flex flex-col gap-10 bg-accent p-5 rounded-lg'>
			<DashboardTagsSelect label='برچسب مقاله :' form={form} />
			<DashboardCategoriesSelect url='/api/dashboard/articles/categories' label='دسته بندی مقاله :' form={form} />
			<DashboardUsersSelect label='نویسنده مقاله :' form={form} />
			<DashboardReadTimeInput label='زمان مطالعه مقاله :' form={form} />
			<DashboardStatusSelect label='وضعیت مقاله :' form={form} />

			<Button
				type='submit'
				disabled={form.formState.isSubmitting}
				variant='default'
				size='lg'
				className='text-base shrink-0 cursor-pointer'
			>
				ثبت مقاله و ساخت مقاله بعدی
			</Button>
		</div>
	)
}
