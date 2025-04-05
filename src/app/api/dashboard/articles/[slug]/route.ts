import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		const article = await prisma.article.findUnique({
			where: { slug },
			include: { tags: true },
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug
	try {
		const article = await prisma.article.delete({
			where: { slug },
		})
		if (!article) {
			return new Response('Article not found', { status: 404 })
		}
		return NextResponse.json({ message: 'Article deleted successfully' }, { status: 200 })
	} catch (error) {
		console.error('Error deleting article:', error)
		return NextResponse.json({ message: 'Error deleting article' }, { status: 500 })
	}
}
