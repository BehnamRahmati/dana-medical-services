import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const services = await prisma.service.findMany({
			where: {
				status: 'PUBLISHED' as const,
			},
			include: {
				author: {
					select: {
						name: true,
						image: true,
					},
				},
				_count: {
					select: { likes: true, comments: true, bookmarks: true },
				},
				category: { select: { name: true, slug: true } },
			},
			take: 4,
			orderBy: {
				createdAt: 'desc',
			},
		})

		return NextResponse.json({ services }, { status: 200 })
	} catch (error) {
		if (error instanceof Error) {
			console.log({ error })
		}
		return NextResponse.json({ error }, { status: 500 })
	}
}
