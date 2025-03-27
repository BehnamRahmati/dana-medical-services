'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { TickSquare } from 'iconsax-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '../ui/Button'
import Section from '../ui/section'

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
	const [rules, setRules] = useState(false)

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.warn('values', values)
	}
	return (
		<Section className='bg-primary px-5 lg:px-0'>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex flex-col items-center gap-10 lg:gap-20 container mx-auto py-10'>
					<div className=''>
						<h2 className='text-4xl lg:text-7xl font-extrabold text-white text-center'>ثبت درخواست خدمات</h2>
						<p className='text-white mt-5 text-center'>
							کافیست خدمت مورد نیاز خود را ثبت کنید و منتظر تماس کارشناسان ما بمانید.
						</p>
					</div>
					<div className=' grid grid-cols-1 lg:grid-cols-2 gap-5 text-white'>
						<label htmlFor='firstname'>
							<p>نام</p>
							<input
								id='firstname'
								{...form.register('firstname')}
								type='text'
								className='bg-accent h-10 rounded-lg mt-2 p-2 w-full text-foreground outline-0 '
								placeholder='مثال: محمد'
							/>
						</label>
						<label htmlFor='lastname'>
							<p>نام خانوادگی</p>
							<input
								id='lastname'
								{...form.register('lastname')}
								type='text'
								className='bg-accent h-10 rounded-lg mt-2 p-2 w-full text-foreground outline-0 '
								placeholder='مثال: محمدی'
							/>
						</label>
						<label htmlFor='phone'>
							<p>شماره تماس</p>
							<input
								id='phone'
								{...form.register('phone')}
								type='number'
								className='bg-accent h-10 rounded-lg mt-2 p-2 w-full text-foreground outline-0 '
								placeholder='مثال: 09123456789 '
							/>
						</label>
						<label htmlFor='service'>
							<p>خدمت</p>
							<select
								id='service'
								{...form.register('category')}
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
							<div className=' flex items-center justify-center'>
								{rules ? (
									<TickSquare
										className='fill-secondary size-5 border border-secondary rounded-sm'
										variant='Bulk'
									/>
								) : (
									<div className='size-5 border border-secondary rounded-sm  '></div>
								)}
							</div>
							<input id='rules' name='rules' type='checkbox' hidden onChange={() => setRules(prev => !prev)} />
							<p>شرایط انجام خدمات و قوانین دنا را مطالعه کرده‌ام و می‌پذیرم.</p>
						</label>
						<Button
							variant='default'
							size='lg'
							type='submit'
							disabled={!rules}
							className='bg-secondary hover:bg-secondary/80'
						>
							ثبت درخواست
						</Button>
					</div>
				</div>
			</form>
		</Section>
	)
}
