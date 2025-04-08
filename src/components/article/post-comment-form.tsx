'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { ArrowLeft3, Profile } from 'iconsax-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormField } from '../ui/form'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
	content: z.string().min(1, { message: 'لطفا دیدگاه خود را وارد کنید' }),
	parent: z.string(),
})

export default function ArticleCommentForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: '',
			parent: '',
		},
	})
	const { data: session, status } = useSession()
	const params = useParams()
	const [rules, setRules] = React.useState(false)

	if (status === 'unauthenticated' || !session?.user) {
		return (
			<div className='bg-secondary rounded-lg py-5 px-10 mt-10 flex flex-col md:flex-row gap-5 items-center justify-between'>
				<div className=' flex items-center gap-1'>
					<Profile className='fill-white size-8' variant='Bulk' />
					<p className='text-white text-xl mt-1'>برای ارسال دیدگاه لازم است وارد شده یا ثبت‌نام کنید</p>
				</div>
				<Link href='/' className='text-white text-xl flex items-center gap-2'>
					<span className='underline underline-offset-2 mt-1'>ورود یا ثبت نام</span>
					<ArrowLeft3 className='fill-white size-7' variant='Bulk' />
				</Link>
			</div>
		)
	}

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.post(`/api/articles/${params?.slug}/comments`, {
				content: values.content,
				userId: session.user.id,
				parentId: values.parent,
			})
		} catch (error) {
			console.error('Error submitting comment:', error)
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5 my-10'>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<Textarea className='min-h-44 text-lg! p-4' {...field} placeholder='دیدگاه خود را بنویسید...' />
					)}
				/>
				<div className='flex flex-col lg:flex-row items-center justify-between'>
					<label htmlFor='rules' className='flex items-center gap-3'>
						<input
							type='checkbox'
							id='rules'
							onChange={e => setRules(e.target.checked)}
							className='shrink-0 w-5 h-5 accent-secondary'
						/>
						<p>شرایط کامنت و قوانین دنا را مطالعه کرده‌ام و می‌پذیرم.</p>
					</label>
					<button
						type='submit'
						disabled={form.formState.isSubmitting || !rules}
						className='bg-secondary cursor-pointer hover:bg-secondary/80 disabled:opacity-50 disabled:hover:bg-secondary disabled:cursor-default text-white text-xl font-bold pt-3 pb-2 px-5 rounded-lg w-fit'
					>
						ارسال دیدگاه
					</button>
				</div>
			</form>
		</Form>
	)
}
