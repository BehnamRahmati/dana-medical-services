import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		const { userId } = await req.json()

		if (!userId) {
			return NextResponse.json({ message: 'user id parameter is missing' }, { status: 400 })
		}
		if (!slug) {
			return NextResponse.json({ message: 'Slug parameter is missing' }, { status: 400 })
		}

		const article = await prisma.article.findUnique({
			where: { slug },
			select: { id: true },
		})

		if (!article) {
			return NextResponse.json({ message: 'Article not found' }, { status: 404 })
		}
		const articleId = article.id

		const existingBookmark = await prisma.bookmark.findFirst({
			where: {
				userId,
				articleId,
				serviceId: null,
			},
		})

		let message: string

		if (existingBookmark) {
			await prisma.bookmark.delete({
				where: {
					id: existingBookmark.id,
				},
			})
			message = 'Article removed from bookmarks'
		} else {
			await prisma.bookmark.create({
				data: {
					userId,
					articleId,
				},
			})
			message = 'Article added to bookmarks'
		}

		return NextResponse.json({ message }, { status: 200 })
	} catch (error) {
		if (error instanceof Error) {
			console.log({ error })
		}

		return NextResponse.json(
			{
				message: 'Failed to add article to bookmarks',
				error,
			},
			{ status: 500 },
		)
	}
}
