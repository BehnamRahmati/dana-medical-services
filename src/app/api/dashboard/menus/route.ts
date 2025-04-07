import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	const menus = await prisma.menu.findMany({ include: { links: true, parent: true } })
	if (!menus) {
		return NextResponse.json({ menus: [] })
	}
	return NextResponse.json({ menus })
}

export async function POST(req: NextRequest) {
	try {
		const { name, parent } = await req.json()
		let menu
		if (!name) {
			throw new Error('failed to creat')
		}

		if (!parent) {
			menu = await prisma.menu.create({
				data: {
					name,
				},
			})
			return NextResponse.json({ menu }, { status: 200 })
		}
		menu = await prisma.menu.create({
			data: {
				name,
				parent: { connect: { id: parent } },
			},
		})
		if (!menu) {
			throw new Error('failed to create')
		}
		return NextResponse.json({ menu }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 })
	}
}
