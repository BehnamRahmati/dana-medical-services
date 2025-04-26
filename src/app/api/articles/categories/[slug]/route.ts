import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		if (!slug) {
			return NextResponse.json({ message: 'Slug parameter is missing' }, { status: 400 })
		}
		const category = await prisma.category.findUnique({
			where: { slug },
			select: {
				name: true,
			},
		})
		if (!category) {
			return NextResponse.json({ message: 'category not found' }, { status: 404 })
		}

		return NextResponse.json({ category }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}
