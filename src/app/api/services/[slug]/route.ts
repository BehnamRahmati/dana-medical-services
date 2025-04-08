import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		const service = await prisma.service.findUnique({
			where: { slug },
			include: {
				author: {
					select: {
						name: true,
						image: true,
					},
				},
				comments: true,
				_count: {
					select: { likes: true, comments: true, bookmarks: true },
				},
			},
		})
		if (!service) {
			return new Response('Category not found', { status: 404 })
		}
		return NextResponse.json({ service })
	} catch (error) {
		console.error('Error fetching category:', error)
		return NextResponse.json({ mesage: 'Error fetching category' }, { status: 500 })
	}
}
