import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id
	try {
		const menu = await prisma.menu.delete({
			where: { id },
		})
		if (!menu) {
			return new Response('menu not found', { status: 404 })
		}
		return NextResponse.json({ message: 'menu deleted successfully' }, { status: 200 })
	} catch (error) {
		console.error('Error deleting menu:', error)
		return NextResponse.json({ message: 'Error deleting menu' }, { status: 500 })
	}
}
