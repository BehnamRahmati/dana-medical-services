import Button from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectSkeleton,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { TCategory, TTag, TUser } from '@/lib/types'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { createFormSchema } from './create-form-schema'

interface ArticleSidebarProps {
	form: UseFormReturn<z.infer<typeof createFormSchema>>
	tagsData?: { tags: TTag[] }
	tagsLoading: boolean
	categoriesData?: { categories: TCategory[] }
	categoriesLoading: boolean
	usersData?: { users: TUser[] }
	usersLoading: boolean
}

export default function CreateFormSidebar({
	form,
	tagsData,
	tagsLoading,
	categoriesData,
	categoriesLoading,
	usersData,
	usersLoading,
}: ArticleSidebarProps) {
	return (
		<div className='w-full md:w-80 flex flex-col gap-10 bg-accent p-5 rounded-lg'>
			{tagsLoading || !tagsData || !tagsData.tags ? (
				<SelectSkeleton />
			) : (
				<FormField
					control={form.control}
					name='tag'
					render={({ field }) => (
						<FormItem>
							<FormLabel> تگ های مقالات:</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='choose a tag' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectGroup>
										{tagsData.tags.length &&
											tagsData.tags.map(tag => (
												<SelectItem value={tag.id} key={tag.id}>
													{tag.name}
												</SelectItem>
											))}
									</SelectGroup>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}

			{categoriesLoading || !categoriesData || !categoriesData.categories ? (
				<SelectSkeleton />
			) : (
				<FormField
					control={form.control}
					name='category'
					render={({ field }) => (
						<FormItem>
							<FormLabel> دسته بندی:</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='choose a category' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectGroup>
										{categoriesData.categories.length &&
											categoriesData.categories.map(cat => (
												<SelectItem value={cat.id} key={cat.id}>
													{cat.name}
												</SelectItem>
											))}
									</SelectGroup>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}

			{usersLoading || !usersData || !usersData.users ? (
				<SelectSkeleton />
			) : (
				<FormField
					control={form.control}
					name='author'
					render={({ field }) => (
						<FormItem>
							<FormLabel> نویسنده مقاله:</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='choose a user' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectGroup>
										{usersData.users.length &&
											usersData.users.map(user => (
												<SelectItem value={user.id} key={user.id}>
													{user.name}
												</SelectItem>
											))}
									</SelectGroup>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}

			<FormField
				control={form.control}
				name='readTime'
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							<p>زمان مطالعه مقاله:</p>
						</FormLabel>
						<FormControl>
							<Input type='number' placeholder='زمان مطالعه به دقیقه' {...field} />
						</FormControl>
						<FormDescription>زمان مطالعه مقاله به دقیقه محاسبه می شود.</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='status'
				render={({ field }) => (
					<FormItem>
						<FormLabel> وضعیت مقاله :</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
							<FormControl>
								<SelectTrigger className='w-full'>
									<SelectValue />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='DRAFT'>پیش نویس</SelectItem>
									<SelectItem value='PUBLISHED'>منتشر شده</SelectItem>
									<SelectItem value='ARCHIVED'>بایگانی شده</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						<FormDescription>وضعیت مقاله را انتخاب کنید.</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>

			<div className='flex flex-col gap-2.5'>
				<Button
					type='submit'
					disabled={form.formState.isSubmitting}
					variant='default'
					size='lg'
					className='text-base shrink-0 cursor-pointer'
				>
					ثبت مقاله و ساخت مقاله بعدی
				</Button>
			</div>
		</div>
	)
}
