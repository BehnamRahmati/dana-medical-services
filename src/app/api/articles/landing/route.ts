import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const articles = await prisma.article.findMany({
			where: {
				status: {
					equals: 'PUBLISHED' as const,
				},
			},
			select: {
				id: true,
				title: true,
				read: true,
				excerpt: true,
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
			orderBy: {
				createdAt: 'desc',
			},
			take: 4,
		})
		return NextResponse.json({ articles }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}
