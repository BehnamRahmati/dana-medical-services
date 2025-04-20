import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TArticle, TComment, TService } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { MoreSquare } from 'iconsax-react'
import ApproveCell from './cells/approve-cell'
import DeleteActionButton from './cells/delete-cell'
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
		accessorKey: 'content',
		header: 'متن دیدگاه',
	},
	{
		accessorKey: 'kind',
		header: 'صفحه',
		cell({ row }) {
			const article = row.original.article as TArticle
			return article ? <Badge variant={'secondary'}>مقاله</Badge> : <Badge>خدمت</Badge>
		},
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
		accessorKey: 'parent',
		header: 'نوع ',
		cell({ row }) {
			const parent = row.getValue('parent') as TComment
			if (parent) {
				return <div className='text-sm'>پاسخ</div>
			}
			return <div className='text-sm'>دیدگاه</div>
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
								<DeleteActionButton id={id} />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)
		},
	},
]
