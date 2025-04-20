import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		if (!slug) {
			return NextResponse.json({ message: 'Slug parameter is missing' }, { status: 400 })
		}
		const article = await prisma.article.findUnique({
			where: { slug },
			include: { tags: true },
		})
		return NextResponse.json({ article })
	} catch (error) {
		console.error('Error fetching category:', error)
		return NextResponse.json({ error }, { status: 500 })
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		if (!slug) {
			return NextResponse.json({ message: 'Slug parameter is missing' }, { status: 400 })
		}
		const articleExists = await prisma.article.findUnique({
			where: { slug },
			select: { id: true },
		})
		if (!articleExists) {
			return new Response('Article not found', { status: 404 })
		}
		const article = await prisma.article.delete({
			where: { slug },
		})

		return NextResponse.json({ article }, { status: 200 })
	} catch (error) {
		console.error('Error deleting article:', error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
