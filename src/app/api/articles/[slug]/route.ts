import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		if (!slug) {
			return NextResponse.json({ message: 'Slug parameter is missing' }, { status: 400 })
		}
		const article = await prisma.article.findUnique({
			where: { slug },
			include: {
				tags: true,
				category: true,
				author: {
					select: {
						name: true,
						image: true,
					},
				},
				_count: {
					select: { likes: true, comments: true, bookmarks: true },
				},
			},
		})
		if (!article) {
			return NextResponse.json({ message: 'Article not found' }, { status: 404 })
		}

		return NextResponse.json({ article }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}
