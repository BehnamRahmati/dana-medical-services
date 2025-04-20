import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		if (!slug) {
			return NextResponse.json({ message: 'slug parameters is missing' }, { status: 400 })
		}
		const existingTag = await prisma.tag.findUnique({
			where: { slug },
			select: { id: true },
		})

		if (!existingTag) {
			return NextResponse.json({ message: `Tag with slug '${slug}' not found` }, { status: 404 })
		}
		const tag = await prisma.tag.delete({
			where: { slug },
		})
		return NextResponse.json({ tag }, { status: 200 })
	} catch (error) {
		console.error('Error deleting tag:', error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
