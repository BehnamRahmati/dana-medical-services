import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		const service = await prisma.service.findUnique({
			where: { slug },
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug
	try {
		const service = await prisma.service.delete({
			where: { slug },
		})
		if (!service) {
			return new Response('service not found', { status: 404 })
		}
		return NextResponse.json({ message: 'service deleted successfully' }, { status: 200 })
	} catch (error) {
		console.error('Error deleting service:', error)
		return NextResponse.json({ message: 'Error deleting service' }, { status: 500 })
	}
}
