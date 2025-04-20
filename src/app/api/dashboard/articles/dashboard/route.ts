import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const articles = await prisma.article.findMany({
			select: {
				title: true,
				slug: true,
				thumbnail: true,
				excerpt: true,
				createdAt: true,
				author: { select: { name: true, id: true } },
				category: { select: { name: true, id: true, slug: true } },
				tags: { select: { name: true, id: true, slug: true } },
				_count: {
					select: {
						comments: true,
						bookmarks: true,
						likes: true,
					},
				},
			},
			take: 4,
			orderBy: {
				createdAt: 'desc',
			},
		})
		return NextResponse.json({ articles }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
