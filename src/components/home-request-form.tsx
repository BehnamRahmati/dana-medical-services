'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from './ui/Button'
import Section from './ui/section'

const formSchema = z.object({
	category: z.string(),
	phone: z.number(),
	firstname: z.string(),
	lastname: z.string(),
})

export default function HomeRequestForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			category: '',
			firstname: '',
			lastname: '',
			phone: 0,
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.warn(values)
	}
	return (
		<Section className='bg-primary/60'>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex flex-row'>
					<div className='w-1/2'>
						<h2 className='text-5xl font-extrabold text-white'>ثبت درخواست خدمات</h2>
						<p className='text-white mt-5'>کافیست خدمت مورد نیاز خود را ثبت کنید و منتظر تماس کارشناسان ما بمانید.</p>
					</div>
					<div className='w-1/2 grid grid-cols-2 gap-5 text-white'>
						<label htmlFor='firstname'>
							<p>نام</p>
							<input
								id='firstname'
								name='firstname'
								type='text'
								className='bg-accent h-10 rounded-lg mt-2 p-2 w-full text-foreground outline-0 '
								placeholder='مثال: محمد'
							/>
						</label>
						<label htmlFor='lastname'>
							<p>نام خانوادگی</p>
							<input
								id='lastname'
								name='lastname'
								type='text'
								className='bg-accent h-10 rounded-lg mt-2 p-2 w-full text-foreground outline-0 '
								placeholder='مثال: محمدی'
							/>
						</label>
						<label htmlFor='phone'>
							<p>شماره تماس</p>
							<input
								id='phone'
								name='phone'
								type='number'
								className='bg-accent h-10 rounded-lg mt-2 p-2 w-full text-foreground outline-0 '
								placeholder='مثال: 09123456789 '
							/>
						</label>
						<label htmlFor='service'>
							<p>خدمت</p>
							<select
								id='service'
								name='service'
								className='bg-accent h-10 rounded-lg mt-2 p-2 w-full text-foreground outline-0 '
							>
								<option value={'hi'}>تزریقات</option>
								<option value={'hi'}>تفسیر آزمایش</option>
								<option value={'hi'}>چکاپ سالمندان</option>
								<option value={'hi'}>خدمات تخصصی پرستاری</option>
								<option value={'hi'}>سونوگرافی در منزل</option>
								<option value={'hi'}>چکاپ کودکان</option>
							</select>
						</label>
						<label htmlFor='rules' className='flex items-start gap-2'>
							<input id='rules' name='rules' type='checkbox' className='bg-accent size-5 rounded-lg' />
							<p>شرایط انجام خدمات و قوانین دنا را مطالعه کرده‌ام و می‌پذیرم.</p>
						</label>
						<Button variant='default' size='lg' type='submit' className='bg-secondary'>
							ثبت درخواست
						</Button>
					</div>
				</div>
			</form>
		</Section>
	)
}
