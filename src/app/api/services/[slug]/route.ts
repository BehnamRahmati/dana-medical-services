import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		if (!slug) {
			return NextResponse.json({ message: 'Slug parameter is missing' }, { status: 400 })
		}
		const service = await prisma.service.findUnique({
			where: { slug },
			include: {
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
				comments: true,
				serviceItems: true,
				_count: {
					select: { likes: true, comments: true, bookmarks: true },
				},
			},
		})
		if (!service) {
			return NextResponse.json('service not found', { status: 404 })
		}
		return NextResponse.json({ service }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}
