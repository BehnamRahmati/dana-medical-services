import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import DashboardContentEditor from '../../form/content-editor'
import DashboardExcerptInput from '../../form/excerpt-input'
import DashboardSlugInput from '../../form/slug-input'
import DashboardThumbnail from '../../form/thumbnail-input'
import DashboardTitleInput from '../../form/title-input'
import { editFormSchema } from '../lib/schemas'

type TProps = {
	form: UseFormReturn<z.infer<typeof editFormSchema>>
	imageUrl: string
	setImageUrl: React.Dispatch<React.SetStateAction<string>>
}
export default function EditFormMain({ form, imageUrl, setImageUrl }: TProps) {
	return (
		<div className='flex-1 flex flex-col gap-10 bg-accent p-5 rounded-lg'>
			<DashboardThumbnail form={form} imageUrl={imageUrl} setImageUrl={setImageUrl} />
			<DashboardTitleInput label='عنوان مقاله :' placeholder='' form={form} />
			<DashboardSlugInput label='پیوند یکتا مقاله :' placeholder='' form={form} />
			<DashboardExcerptInput label='توضیح کوتاه مقاله :' form={form} />
			<DashboardContentEditor label='محتوای مقاله :' form={form} />
		</div>
	)
}
