import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url)
		// --- filtering Parameters ---
		const search = searchParams.get('search')
		const category = searchParams.get('category')
		// --- sorting Parameters ---
		const sort = searchParams.get('sort') || 'createdAt_asc'
		// --- Pagination Parameters ---
		const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
		const limit = Math.min(50, parseInt(searchParams.get('limit') || '9', 10))
		const skip = (page - 1) * limit

		const where = {
			status: {
				equals: 'PUBLISHED' as const,
			},
			...(category && { category: { is: { slug: category } } }),
			...(search && {
				OR: [
					{ title: { contains: search, mode: 'insensitive' as const } },
					{ content: { contains: search, mode: 'insensitive' as const } },
				],
			}),
		}

		const orderBy = (() => {
			switch (sort) {
				case 'views_asc':
					return { views: { _count: 'asc' as const } }
				case 'views_desc':
					return { views: { _count: 'desc' as const } }
				case 'comments_asc':
					return { comments: { _count: 'asc' as const } }
				case 'comments_desc':
					return { comments: { _count: 'desc' as const } }
				case 'createdAt_asc':
					return { createdAt: 'asc' as const }
				case 'likes_asc':
					return { likes: { _count: 'asc' as const } }
				case 'likes_desc':
					return { likes: { _count: 'desc' as const } }
				default:
					return { createdAt: 'desc' as const }
			}
		})()

		const [services, totalServices] = await prisma.$transaction([
			prisma.service.findMany({
				where,
				orderBy,
				skip,
				take: limit,
				include: {
					author: {
						select: {
							name: true,
							image: true,
						},
					},
					category: {
						select: {
							slug: true,
							name: true,
						},
					},
					_count: {
						select: { likes: true, comments: true, bookmarks: true },
					},
				},
			}),
			prisma.article.count({ where }),
		])
		const totalPages = Math.ceil(totalServices / limit)

		return NextResponse.json(
			{
				services,
				pagination: {
					currentPage: page,
					totalPages,
					totalServices,
					limit,
				},
			},
			{ status: 200 },
		)
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}
