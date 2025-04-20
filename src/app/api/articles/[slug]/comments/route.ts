import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug

		if (!slug) {
			return NextResponse.json({ message: 'Slug parameter is missing' }, { status: 400 })
		}

		const articleExists = await prisma.article.findUnique({ where: { slug }, select: { id: true } })

		if (!articleExists) {
			return NextResponse.json({ message: 'Article not found' }, { status: 404 })
		}

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
					orderBy: {
						createdAt: 'asc',
					},
				},
				_count: { select: { likes: true } },
			},
		})

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

		if (!slug) {
			return NextResponse.json({ message: 'Slug parameter is missing' }, { status: 400 })
		}

		if (!content || !userId) {
			return NextResponse.json({ message: 'Content and userId are required' }, { status: 400 })
		}

		const [article, user, parentComment] = await Promise.all([
			prisma.article.findUnique({ where: { slug }, select: { id: true } }),
			prisma.user.findUnique({ where: { id: userId }, select: { id: true } }),
			parentId ? prisma.comment.findUnique({ where: { id: parentId }, select: { id: true } }) : Promise.resolve(null),
		])

		if (!article) {
			return NextResponse.json({ message: 'Article not found' }, { status: 404 })
		}
		if (!user) {
			return NextResponse.json({ message: 'User not found' }, { status: 404 })
		}
		if (parentId && !parentComment) {
			return NextResponse.json({ message: 'Parent comment not found' }, { status: 404 })
		}

		const comment = await prisma.comment.create({
			data: {
				content,
				article: { connect: { slug } },
				user: { connect: { id: userId } },
				...(parentId && { parent: { connect: { id: parentId } } }),
			},
		})

		if (!comment) {
			return NextResponse.json({ message: 'comment not found' }, { status: 404 })
		}

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

		if (!userId) {
			return NextResponse.json({ message: 'user id parameter is missing' }, { status: 400 })
		}
		if (!slug) {
			return NextResponse.json({ message: 'Slug parameter is missing' }, { status: 400 })
		}
		if (!commentId) {
			return NextResponse.json({ message: 'comment id parameter is missing' }, { status: 400 })
		}

		const [userExists, commentExists] = await Promise.all([
			prisma.user.findUnique({ where: { id: userId }, select: { id: true } }),
			prisma.comment.findUnique({ where: { id: commentId }, select: { id: true } }),
		])

		if (!userExists) {
			return NextResponse.json({ message: 'User not found' }, { status: 404 })
		}
		if (!commentExists) {
			return NextResponse.json({ message: 'Comment not found' }, { status: 404 })
		}

		const existingLike = await prisma.like.findFirst({
			where: {
				userId: userId,
				articleId: null,
				serviceId: null,
				commentId: commentId,
			},
		})
		let message

		if (existingLike) {
			await prisma.like.delete({
				where: { id: existingLike.id },
			})
			message = 'successfully removed like'
		} else {
			await prisma.like.create({
				data: {
					user: { connect: { id: userId } },
					comment: { connect: { id: commentId } },
				},
			})
			message = 'successfully added like'
		}

		return NextResponse.json({ message }, { status: 200 })
	} catch (error) {
		if (error instanceof Error) {
			console.log({ error })
		}

		return NextResponse.json(
			{
				message: 'failed to add or remove like',
				error,
			},
			{ status: 500 },
		)
	}
}
