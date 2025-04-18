import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const { searchParams } = new URL(req.url)
		const tags = searchParams.get('tags')?.split(',')
		const slug = (await params).slug

		if (!tags) {
			throw new Error('Category slug is required')
		}
		const articles = await prisma.article.findMany({
			where: {
				slug: {
					not: slug,
				},
				tags: {
					some: {
						slug: {
							in: tags,
						},
					},
				},
			},
			take: 4,
			orderBy: {
				likes: {
					_count: 'desc',
				},
			},
			select: {
				id: true,
				title: true,
				slug: true,
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
