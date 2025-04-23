import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		if (!slug) {
			return NextResponse.json({ message: 'slug parameter is missing' }, { status: 400 })
		}

		const article = await prisma.article.findUnique({
			where: { slug },
			select: { id: true },
		})

		if (!article) {
			return NextResponse.json({ message: 'Article not found' }, { status: 404 })
		}

		const likes = await prisma.like.count({
			where: { article: { id: article.id } },
		})

		return NextResponse.json({ likes }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		const { userId } = await req.json()

		if (!userId) {
			return NextResponse.json({ message: 'user id parameter is missing' }, { status: 400 })
		}
		if (!slug) {
			return NextResponse.json({ message: 'slug parameter is missing' }, { status: 400 })
		}

		const article = await prisma.article.findUnique({
			where: { slug },
			select: { id: true },
		})

		if (!article) {
			return NextResponse.json({ message: 'Article not found' }, { status: 404 })
		}

		const existingLike = await prisma.like.findFirst({
			where: {
				userId: userId,
				articleId: article.id,
				serviceId: null,
				commentId: null,
			},
		})

		let message

		if (existingLike) {
			await prisma.like.delete({
				where: { id: existingLike.id },
			})
			message = 'successfully removed like from article'
		} else {
			await prisma.like.create({
				data: {
					user: { connect: { id: userId } },
					article: { connect: { id: article.id } },
				},
			})
			message = 'successfully added like to article'
		}

		return NextResponse.json({ message }, { status: 200 })
	} catch (error) {
		if (error instanceof Error) {
			console.log({ error })
		}

		return NextResponse.json(
			{
				message: 'Failed to update like',
				error,
			},
			{ status: 500 },
		)
	}
}
