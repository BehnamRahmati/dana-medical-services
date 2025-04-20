import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const categories = await prisma.category.findMany({
			where: { articles: { none: {} }, services: { some: {} } },
		})

		return NextResponse.json({ categories }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}
