'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '../ui/button'

const formSchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

async function onSubmit(values: z.infer<typeof formSchema>) {
	console.warn('values', values)
}

export default function LoginForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})
	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
			<div className='flex items-center gap-2 my-10'>
				<span className='border-b border-b-border flex-1'></span>
				<span> یا ورود به حساب با</span>
				<span className='border-b border-b-border flex-1'></span>
			</div>

			<input
				{...form.register('email')}
				type='email'
				placeholder='ایمیل'
				className='bg-accent border border-border rounded-lg p-2.5 mb-5'
			/>
			<input
				{...form.register('password')}
				type='password'
				placeholder='رمز عبور'
				className='bg-accent border border-border rounded-lg p-2.5 mb-5'
			/>
			<Button variant='default' size='lg' type='submit' className='bg-secondary hover:bg-secondary/80'>
				ورود به حساب کاربری
			</Button>
		</form>
	)
}
