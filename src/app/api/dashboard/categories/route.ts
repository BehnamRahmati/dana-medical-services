import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	try {
		const categories = await prisma.category.findMany({ orderBy: { createdAt: 'desc' } })
		return NextResponse.json({ categories }, { status: 200 })
	} catch (error) {
		console.log({ error })
		return NextResponse.json({ error }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	try {
		const { name, slug } = await req.json()

		if (!name || !slug) {
			return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
		}

		const category = await prisma.category.create({
			data: {
				name,
				slug,
			},
		})
		return NextResponse.json({ category }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}
