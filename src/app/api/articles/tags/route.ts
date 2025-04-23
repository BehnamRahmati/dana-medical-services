import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const tags = await prisma.tag.findMany({
			where: {
				articles: { some: {} },
			},
		})
		return NextResponse.json({ tags }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
