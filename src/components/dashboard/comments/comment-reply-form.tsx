'use client'

import Button from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { handleToastPromise } from '@/lib/helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddSquare } from 'iconsax-react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import { z } from 'zod'
const formSchema = z.object({
	content: z.string().min(1, { message: 'لطفا دیدگاه خود را وارد کنید' }),
})

export default function CommentReplyForm({
	commentId,
	articleId,
	serviceId,
	content,
}: {
	commentId: string
	articleId?: string
	serviceId?: string
	content: string
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: '',
		},
	})

	const { data: session } = useSession()
	const { mutate } = useSWRConfig()
	async function createReply(values: z.infer<typeof formSchema>) {
		return await fetch('/api/dashboard/comments', {
			method: 'PUT',
			body: JSON.stringify({
				content: values.content,
				commentId,
				userId: session?.user.id,
				...(articleId ? { articleId } : { serviceId }),
			}),
		})
	}

	async function onSubmit(values: z.infer<typeof formSchema>) {
		handleToastPromise(
			() => createReply(values),
			'در حال ارسال پاسخ',
			'پاسخ با موفقیت ارسال شد',
			'خطا در ارسال پاسخ',
			() => {
				form.reset()
				mutate(['/api/dashboard/comments', 'dc-comments'])
			},
		)
	}
	return (
		<Dialog modal={true}>
			<DialogTrigger asChild>
				<button type='button' className='px-2 py-1 text-sm flex items-center gap-2 cursor-pointer'>
					<AddSquare className='stroke-content size-5 shrink-0' variant='Broken' />
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>پاسخ به دیدگاه</DialogTitle>
					<DialogDescription>{content}</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
						<FormField
							control={form.control}
							name='content'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-sm'>پاسخ به دیدگاه بالا </FormLabel>
									<FormControl>
										<Textarea
											className='w-full h-24 p-2 border border-gray-300 rounded-md'
											placeholder='پاسخ خود را وارد کنید'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button variant={'default'} type='submit'>
							ارسال پاسخ
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
