import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	const services = await prisma.service.findMany({
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
			ServiceCategory: { select: { name: true, slug: true } },
		},
		take: 4,
	})
	if (!services) {
		return NextResponse.json({ services: [] })
	}
	return NextResponse.json({ services })
}
