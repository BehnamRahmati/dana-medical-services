import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug
	try {
		const category = await prisma.category.delete({
			where: { slug },
		})
		if (!category) {
			return new Response('category not found', { status: 404 })
		}
		return NextResponse.json({ message: 'category deleted successfully' }, { status: 200 })
	} catch (error) {
		console.error('Error deleting category:', error)
		return NextResponse.json({ message: 'Error deleting category' }, { status: 500 })
	}
}
