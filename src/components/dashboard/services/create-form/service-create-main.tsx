import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import DashboardContentEditor from '../../form/content-editor'
import DashboardExcerptInput from '../../form/excerpt-input'
import DashboardSlugInput from '../../form/slug-input'
import DashboardThumbnail from '../../form/thumbnail-input'
import DashboardTitleInput from '../../form/title-input'
import { editServiceSchema } from '../lib/schemas'

type TProps = {
	form: UseFormReturn<z.infer<typeof editServiceSchema>>
	imageUrl: string
	setImageUrl: React.Dispatch<React.SetStateAction<string>>
}
export default function CreateServiceFormMain({ form, imageUrl, setImageUrl }: TProps) {
	return (
		<div className='flex-1 flex flex-col gap-10 bg-accent p-5 rounded-lg'>
			<DashboardThumbnail form={form} imageUrl={imageUrl} setImageUrl={setImageUrl} />
			<DashboardTitleInput label='عنوان خدمت :' placeholder='' form={form} />
			<DashboardSlugInput label='پیوند یکتا خدمت :' placeholder='' form={form} />
			<DashboardExcerptInput label='توضیح کوتاه خدمت :' form={form} />
			<DashboardContentEditor label='محتوای خدمت :' form={form} />
		</div>
	)
}
