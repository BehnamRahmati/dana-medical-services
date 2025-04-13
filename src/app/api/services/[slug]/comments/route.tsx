import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await params
		const comments = await prisma.comment.findMany({
			where: { service: { slug } },
			include: {
				user: { select: { id: true, name: true, image: true } },
				service: { select: { slug: true } },
				replies: {
					include: {
						user: { select: { id: true, name: true, image: true } },
						_count: { select: { likes: true } },
					},
				},
				_count: { select: { likes: true } },
			},
		})

		if (!comments) {
			return NextResponse.json({ comments: [] }, { status: 200 })
		}
		return NextResponse.json({ comments }, { status: 200 })
	} catch (error) {
		console.error('Error fetching comments:', error)
		return NextResponse.json('Internal Server Error', { status: 500 })
	}
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await params
		const body = await request.json()
		const { content, userId, parentId } = body

		if (!content) {
			return NextResponse.json('Content is required', { status: 400 })
		}

		const comment = await prisma.comment.create({
			data: {
				content,
				service: { connect: { slug } },
				user: { connect: { id: userId } },
				...(parentId && { parent: { connect: { id: parentId } } }),
			},
		})

		return NextResponse.json({ comment }, { status: 201 })
	} catch (error) {
		console.error('Error creating comment:', error)
		return NextResponse.json('Internal Server Error', { status: 500 })
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		const { userId, commentId } = await req.json()

		if (!userId || !slug) {
			throw new Error('userId شناسایی نشد')
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: { likes: { select: { comment: true } } },
		})

		if (!user) {
			throw new Error('user شناسایی نشد')
		}

		const alreadyLiked = user.likes.some(like => like.comment?.id === commentId)

		const data = alreadyLiked ? { likes: { disconnect: { id: userId } } } : { likes: { connect: { id: userId } } }

		const comment = await prisma.article.update({ where: { slug }, data })

		if (!comment) {
			throw new Error('خطا در افزایش لایک ها')
		}

		return NextResponse.json({ message: 'لایک ها با موفقیت افزایش یافت', comment }, { status: 200 })
	} catch (error) {
		if (error instanceof Error) {
			console.log({ error })
		}

		return NextResponse.json(
			{
				message: 'خطا در افزایش لابک ها',
				error,
			},
			{ status: 200 },
		)
	}
}
