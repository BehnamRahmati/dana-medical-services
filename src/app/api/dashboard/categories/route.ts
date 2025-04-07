import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	const categories = await prisma.category.findMany()
	if (!categories) {
		return NextResponse.json({ categories: [] })
	}
	return NextResponse.json({ categories })
}

export async function POST(req: NextRequest) {
	try {
		const { name, slug } = await req.json()
		const category = await prisma.category.create({
			data: {
				name,
				slug,
			},
		})
		if (!category) {
			throw new Error('failed to create category')
		}
		return NextResponse.json({ category }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}
