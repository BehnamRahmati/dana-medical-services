import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const category = searchParams.get('category')
	const tags = searchParams.get('tags')
	if (tags) {
		const articles = await prisma.article.findMany({
			where: { tags: { some: { OR: tags.split(',').map(tag => ({ slug: tag })) } } },

			select: {
				title: true,
				slug: true,
				thumbnail: true,
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
		if (!articles) {
			return NextResponse.json({ articles: [] })
		}
		return NextResponse.json({ articles })
	}

	if (category) {
		const articles = await prisma.article.findMany({
			where: { category: { slug: category } },
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
		if (!articles) {
			return NextResponse.json({ articles: [] })
		}
		return NextResponse.json({ articles })
	}
	const articles = await prisma.article.findMany({
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
	if (!articles) {
		return NextResponse.json({ articles: [] })
	}
	return NextResponse.json({ articles })
}
