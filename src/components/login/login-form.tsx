'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const formSchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

export default function LoginForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})
	const router = useRouter()

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const result = await signIn('credentials', {
			email: values.email,
			password: values.password,
			redirect: false,
		})

		if (result?.error) {
			console.error('Sign-in error:', result.error)
		} else if (result?.ok) {
			const session = await getSession()
			const userRole = session?.user?.role

			if (userRole === 'ADMIN' || userRole === 'SUPERADMIN') {
				router.push('/dashboard')
			} else {
				router.push('/')
			}
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
				<div className='flex items-center gap-2 my-10'>
					<span className='border-b border-b-border flex-1'></span>
					<span> یا ورود به حساب با</span>
					<span className='border-b border-b-border flex-1'></span>
				</div>
				<div className='flex flex-col gap-5'>
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
					<div className=''>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input type='password' placeholder='رمز عبور' className='bg-accent ' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button variant='default' size='lg' type='submit' className='bg-secondary hover:bg-secondary/80'>
						ورود به حساب کاربری
					</Button>
				</div>
			</form>
		</Form>
	)
}
