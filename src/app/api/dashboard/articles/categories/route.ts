import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	const categories = await prisma.category.findMany({
		where: {
			services: { none: {} },
		},
	})
	if (!categories) {
		return NextResponse.json({ categories: [] })
	}
	return NextResponse.json({ categories })
}
