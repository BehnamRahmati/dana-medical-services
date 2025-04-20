import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const { searchParams } = new URL(req.url)
		const categorySlug = searchParams.get('category')
		const slug = (await params).slug
		if (!categorySlug) {
			return NextResponse.json({ message: 'Category slug is required' }, { status: 400 })
		}

		if (!slug) {
			return NextResponse.json({ message: 'Slug parameter is missing' }, { status: 400 })
		}

		const [category, article] = await Promise.all([
			prisma.category.findUnique({
				where: { slug: categorySlug },
			}),
			prisma.article.findUnique({
				where: { slug },
			}),
		])

		if (!article) {
			return NextResponse.json({ message: 'Article not found' }, { status: 404 })
		}

		if (!category) {
			return NextResponse.json({ message: 'Article not found' }, { status: 404 })
		}

		const articles = await prisma.article.findMany({
			where: {
				slug: {
					not: slug,
				},
				category: { slug: categorySlug },
			},
			take: 3,
			orderBy: {
				likes: {
					_count: 'desc',
				},
			},
			include: {
				author: {
					select: {
						name: true,
						image: true,
					},
				},
				category: {
					select: {
						name: true,
						slug: true,
					},
				},
				_count: {
					select: {
						likes: true,
						comments: true,
						bookmarks: true,
					},
				},
			},
		})
		return NextResponse.json(
			{
				articles,
			},
			{ status: 200 },
		)
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
