import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const { searchParams } = new URL(req.url)
		const categorySlug = searchParams.get('category')
		const slug = (await params).slug

		if (!categorySlug) {
			throw new Error('Category slug is required')
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
		if (!articles) {
			throw new Error('Articles not found')
		}
		return NextResponse.json({
			articles,
		})
	} catch (error) {
		console.log(error)
		return NextResponse.json({
			success: false,
			message: 'Something went wrong',
		})
	}
}
