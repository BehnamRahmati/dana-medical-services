import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	const comments = await prisma.comment.findMany({
		include: {
			parent: { select: { id: true, content: true } },
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
			return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
		}

		const commentExists = await prisma.comment.findUnique({
			where: { id: commentId },
		})
		if (!commentExists) {
			return NextResponse.json({ message: 'comment not found' }, { status: 404 })
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
		return NextResponse.json({ comment }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}

export async function PATCH(req: NextRequest) {
	try {
		const { commentId } = await req.json()
		if (!commentId) {
			return NextResponse.json({ message: 'comment di parameter ins missing' }, { status: 400 })
		}

		const commentExists = await prisma.comment.findUnique({
			where: { id: commentId },
		})
		if (!commentExists) {
			return NextResponse.json({ message: 'comment not found' }, { status: 404 })
		}

		const comment = await prisma.comment.update({
			where: { id: commentId },
			data: {
				approved: true,
			},
		})
		return NextResponse.json({ comment }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
