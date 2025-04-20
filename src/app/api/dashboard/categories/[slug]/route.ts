import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		if (!slug) {
			return NextResponse.json({ message: 'slug parameter is missing fields' }, { status: 400 })
		}

		const article = await prisma.category.findUnique({
			where: { slug },
		})

		if (!article) {
			return NextResponse.json({ message: 'Article not found' }, { status: 404 })
		}

		return NextResponse.json({ article }, { status: 200 })
	} catch (error) {
		console.error('Error fetching category:', error)
		return NextResponse.json({ error }, { status: 500 })
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		if (!slug) {
			return NextResponse.json({ message: 'slug parameter is missing fields' }, { status: 400 })
		}

		const existingCategory = await prisma.category.findUnique({
			where: { slug },
		})

		if (!existingCategory) {
			return NextResponse.json({ message: 'category not found' }, { status: 404 })
		}

		const category = await prisma.category.delete({
			where: { slug },
		})
		return NextResponse.json({ category }, { status: 200 })
	} catch (error) {
		console.error('Error deleting category:', error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
