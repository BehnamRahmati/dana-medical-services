import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await params
		const comments = await prisma.comment.findMany({
			where: { article: { slug } },
			include: {
				user: { select: { id: true, name: true, image: true } },
				article: { select: { slug: true } },
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
				article: { connect: { slug } },
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

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		const { userId, commentId } = await req.json()

		if (!userId || !slug) {
			throw new Error('userId شناسایی نشد')
		}

		// First find the article by slug
		const comment = await prisma.comment.findUnique({
			where: { id: commentId },
			select: { id: true },
		})

		if (!comment) {
			throw new Error('user شناسایی نشد')
		}

		// Check if the like already exists
		const existingLike = await prisma.like.findFirst({
			where: {
				userId: userId,
				articleId: null,
				serviceId: null,
				commentId: commentId,
			},
		})
		let result

		if (existingLike) {
			// If like exists, delete it
			result = await prisma.like.delete({
				where: { id: existingLike.id },
			})
		} else {
			// If like doesn't exist, create it
			result = await prisma.like.create({
				data: {
					user: { connect: { id: userId } },
					comment: { connect: { id: comment.id } },
				},
			})
		}

		if (!result) {
			throw new Error('خطا در افزایش لایک ها')
		}

		return NextResponse.json({ message: 'لایک ها با موفقیت افزایش یافت', result }, { status: 200 })
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
