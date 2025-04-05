import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { slug: string } }) {
	try {
		const slug = params.slug
		const article = await prisma.category.findUnique({
			where: { slug },
		})
		if (!article) {
			return new Response('Category not found', { status: 404 })
		}
		return NextResponse.json({ article })
	} catch (error) {
		console.error('Error fetching category:', error)
		return NextResponse.json({ mesage: 'Error fetching category' }, { status: 500 })
	}
}
