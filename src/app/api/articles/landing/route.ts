import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	const articles = await prisma.article.findMany({
		select: {
			id: true,
			title: true,
			read: true,
			thumbnail: true,
			slug: true,
			category: {
				select: {
					name: true,
					slug: true,
				},
			},
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
		take: 4,
	})
	if (!articles) {
		return NextResponse.json({ articles: [] })
	}
	return NextResponse.json({ articles })
}
