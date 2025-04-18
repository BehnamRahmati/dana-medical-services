import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	const comments = await prisma.comment.findMany({
		include: {
			article: { select: { title: true, id: true } },
			service: { select: { title: true, id: true } },
			user: { select: { name: true, image: true } },
		},
	})
	if (!comments) {
		return NextResponse.json({ comments: [] })
	}
	return NextResponse.json({ comments })
}

export async function PUT(req: NextRequest) {
	try {
		const { content, commentId, userId, articleId, serviceId } = await req.json()
		if (!content || !commentId || !userId) {
			return NextResponse.json({ message: 'لطفا همه فیلدها را پر کنید' }, { status: 400 })
		}
		const comment = await prisma.comment.update({
			where: { id: commentId },
			data: {
				replies: {
					create: {
						content,
						...(serviceId && { service: { connect: { id: serviceId } } }),
						...(articleId && { article: { connect: { id: articleId } } }),
						user: { connect: { id: userId } },
						approved: true,
					},
				},
			},
		})
		return NextResponse.json({ message: 'دیدگاه با موفقیت ویرایش شد', comment })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: 'خطا در ویرایش دیدگاه' }, { status: 500 })
	}
}

export async function PATCH(req: NextRequest) {
	try {
		const { commentId } = await req.json()
		if (!commentId) {
			return NextResponse.json({ message: 'لطفا همه فیلدها را پر کنید' }, { status: 400 })
		}
		const comment = await prisma.comment.update({
			where: { id: commentId },
			data: {
				approved: true,
			},
		})
		return NextResponse.json({ message: 'دیدگاه با موفقیت تایید شد', comment })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: 'خطا در ویرایش دیدگاه' }, { status: 500 })
	}
}
