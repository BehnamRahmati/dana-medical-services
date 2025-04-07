import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug
	try {
		const tag = await prisma.tag.delete({
			where: { slug },
		})
		if (!tag) {
			return new Response('tag not found', { status: 404 })
		}
		return NextResponse.json({ message: 'tag deleted successfully' }, { status: 200 })
	} catch (error) {
		console.error('Error deleting tag:', error)
		return NextResponse.json({ message: 'Error deleting tag' }, { status: 500 })
	}
}
