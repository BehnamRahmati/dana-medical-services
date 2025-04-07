import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const category = searchParams.get('category')
	const tags = searchParams.get('tags')
	const search = searchParams.get('search')
	const sort = searchParams.get('sort') || 'views_asc'
	const where = {
		...(category && { category: { is: { slug: category } } }),
		...(tags && { tags: { some: { slug: { in: tags.split(',') } } } }),
		...(search && {
			title: {
				contains: search,
			},
		}),
	}

	const orderBy = (() => {
		switch (sort) {
			case 'views_asc':
				return { views: 'asc' as const }
			case 'views_desc':
				return { views: 'desc' as const }
			case 'name_asc':
				return { name: 'asc' as const }
			case 'name_desc':
				return { name: 'desc' as const }
			default:
				return { createdAt: 'desc' as const }
		}
	})()

	const articles = await prisma.article.findMany({
		where,
		orderBy,
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
