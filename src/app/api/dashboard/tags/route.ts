import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	try {
		const tags = await prisma.tag.findMany({ orderBy: { createdAt: 'desc' } })
		return NextResponse.json({ tags }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	try {
		const { name, slug } = await req.json()
		if (!name || !slug) {
			return NextResponse.json({ message: 'Name and slug are required' }, { status: 400 })
		}

		const existingTag = await prisma.tag.findUnique({
			where: { slug },
			select: { id: true },
		})

		if (existingTag) {
			return NextResponse.json({ message: `Tag with slug '${slug}' already exists` }, { status: 409 }) // 409 Conflict
		}
		const tag = await prisma.tag.create({
			data: {
				name,
				slug,
			},
		})
		return NextResponse.json({ tag }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}
