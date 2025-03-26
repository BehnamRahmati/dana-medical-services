'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PiMagnifyingGlassDuotone } from 'react-icons/pi'
import { z } from 'zod'
import Button from './ui/Button'

const formSchema = z.object({
	term: z.string(),
})
export default function HeaderSearchForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			term: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.warn(values)
	}
	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='flex items-center bg-background h-11 w-1/2 rounded-lg'>
			<Button type='submit' variant='ghost' size='icon' className='shrink-0 hover:bg-transparent cursor-pointer'>
				<PiMagnifyingGlassDuotone />
			</Button>
			<input type='search' className='flex-1 h-full outline-0 pl-2 text-sm' placeholder='به چه خدمتی نیاز دارید؟' />
		</form>
	)
}
