import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	const categories = await prisma.category.findMany()
	if (!categories) {
		return NextResponse.json({ categories: [] })
	}
	return NextResponse.json({ categories })
}
