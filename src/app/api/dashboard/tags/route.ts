import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	const tags = await prisma.tag.findMany({ orderBy: { createdAt: 'desc' } })
	if (!tags) {
		return NextResponse.json({ tags: [] })
	}
	return NextResponse.json({ tags })
}

export async function POST(req: NextRequest) {
	try {
		const { name, slug } = await req.json()
		const tag = await prisma.tag.create({
			data: {
				name,
				slug,
			},
		})
		if (!tag) {
			throw new Error('failed to create tag')
		}
		return NextResponse.json({ tag }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}
