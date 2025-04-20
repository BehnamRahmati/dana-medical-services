'use client'
import { handleToastPromise } from '@/lib/helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const formSchema = z
	.object({
		firstname: z.string().min(1, { message: 'نام خود راوارد کنید.' }),
		lastname: z.string().min(1, { message: 'نام خانوادگی خود را وارد کنید.' }),
		email: z.string().email({ message: 'لطفا ایمیل معتبر وارد کنید' }),
		password: z.string().min(8, { message: 'رمز عبور باید حداقل 8 کاراکتر باشد' }),
		passwordConfirm: z.string(),
	})
	.refine(data => data.password === data.passwordConfirm, {
		message: 'رمز‌های عبور یکسان نیستند',
		path: ['passwordConfirm'],
	})

export default function RegisterForm() {
	const router = useRouter()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			passwordConfirm: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const createUser = fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: values.email,
				password: values.password,
				firstname: values.firstname,
				lastname: values.lastname,
			}),
		})

		handleToastPromise(
			() => createUser,
			'در حال ثبت نام',
			'ثبت نام با موفقیت انجام شد',
			'ثبت نام با خطا مواجه شد',
			async () => {
				const signInResult = await signIn('credentials', {
					email: values.email,
					password: values.password,
					redirect: false,
				})
				if (signInResult?.ok) {
					router.push('/')
				}
			},
		)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
				<div className='flex items-center gap-2 my-10'>
					<span className='border-b border-b-border flex-1'></span>
					<span> یا ساخت حساب کاربری با</span>
					<span className='border-b border-b-border flex-1'></span>
				</div>

				<div className='flex flex-col gap-5'>
					<div className='flex flex-col md:flex-row gap-5 *:flex-1'>
						<FormField
							control={form.control}
							name='firstname'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='نام' className='bg-accent' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='lastname'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='نام خانوادگی' className='bg-accent' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input type='email' placeholder='ایمیل' className='bg-accent' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input type='password' placeholder='رمز عبور' className='bg-accent' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='passwordConfirm'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input type='password' placeholder='تکرار رمز عبور' className='bg-accent ' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					disabled={form.formState.isSubmitting}
					variant='default'
					size='lg'
					type='submit'
					className='bg-secondary hover:bg-secondary/80 mt-5'
				>
					ساخت حساب کاربری
				</Button>
			</form>
		</Form>
	)
}
