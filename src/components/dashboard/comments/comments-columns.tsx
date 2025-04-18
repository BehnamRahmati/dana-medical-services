import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TArticle, TComment, TService } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import axios from 'axios'
import { MoreSquare, Trash } from 'iconsax-react'
import { toast } from 'sonner'
import ApproveCell from './cells/approve-cell'
import CommentReplyForm from './comment-reply-form'
export const CommentColumns: ColumnDef<TComment>[] = [
	{
		accessorKey: 'title',
		header: 'عنوان',
		cell({ row }) {
			const article = row.original.article as TArticle
			const service = row.original.service as TService
			return article ? <div> {article.title}</div> : <div>{service.title}</div>
		},
	},
	{
		accessorKey: 'kind',
		header: 'نوع',
		cell({ row }) {
			const article = row.original.article as TArticle
			return article ? <Badge variant={'secondary'}>مقاله</Badge> : <Badge>خدمت</Badge>
		},
	},
	{
		accessorKey: 'content',
		header: 'دیدگاه',
	},
	{
		accessorKey: 'approved',
		header: 'وضعیت',
		cell({ row }) {
			const approved = row.getValue('approved') as string
			if (approved) {
				return <div className='text-green-500 bg-green-500/20 w-fit pb-1 pt-1.5 px-2.5 rounded-md text-xs'>تایید شده</div>
			}
			return <div className='text-amber-500 bg-amber-500/20 w-fit pb-1 pt-1.5 px-2.5 rounded-md text-xs'>بلاتکلیف</div>
		},
	},
	{
		accessorKey: 'action',
		header: 'عملیات',
		cell: ({ row }) => {
			const id = row.original.id as string
			const article = row.original.article as TArticle
			const service = row.original.service as TService
			const content = row.getValue('content') as string
			return (
				<div className='flex items-center gap-1'>
					{article ? (
						<CommentReplyForm commentId={id} articleId={article.id} content={content} />
					) : (
						<CommentReplyForm commentId={id} serviceId={service.id} content={content} />
					)}

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<MoreSquare className='stroke-content size-5' variant='Broken' />
						</DropdownMenuTrigger>
						<DropdownMenuContent align='start'>
							<ApproveCell id={id} />
							<DropdownMenuItem>
								<button
									className='flex items-center gap-2 cursor-pointer text-red-500'
									onClick={async () => {
										try {
											toast('در حال حذف دیدگاه', { icon: '⏳' })
											await axios.delete(`/api/dashboard/comments/${id}`)
											toast(' دیدگاه با موفقیت حذف شد', { icon: '✅' })
										} catch (error) {
											console.log(error)
											toast('خطا در حذف دیدگاه', { icon: '❌' })
										}
									}}
								>
									<Trash className='stroke-red-500 size-4 shrink-0' variant='Broken' />
									<p className='mt-1.5'>حذف دیدگاه</p>
								</button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)
		},
	},
]
