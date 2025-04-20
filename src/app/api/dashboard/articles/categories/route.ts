import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const categories = await prisma.category.findMany({
			where: {
				services: { none: {} },
			},
			orderBy: { createdAt: 'desc' },
		})
		return NextResponse.json({ categories }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
