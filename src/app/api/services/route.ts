import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const search = searchParams.get('search')
	const category = searchParams.get('category')
	const sort = searchParams.get('sort') || 'views_asc'
	const where = {
		...(category && { ServiceCategory: { is: { slug: category } } }),
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

	const services = await prisma.service.findMany({
		where,
		orderBy,
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
		},
	})
	if (!services) {
		return NextResponse.json({ services: [] })
	}
	return NextResponse.json({ services })
}
