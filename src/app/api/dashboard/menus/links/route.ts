import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	const links = await prisma.link.findMany()
	if (!links) {
		return NextResponse.json({ links: [] })
	}
	return NextResponse.json({ links })
}

export async function POST(req: NextRequest) {
	try {
		const { name, url, menu } = await req.json()

		if (!name || !url || !menu) {
			throw new Error('failed to creat')
		}
		const link = await prisma.link.create({
			data: {
				name,
				url,
				menu: { connect: { id: menu } },
			},
		})
		if (!link) {
			throw new Error('failed to create')
		}
		return NextResponse.json({ link }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 })
	}
}
