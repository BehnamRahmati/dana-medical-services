import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	const tags = await prisma.tag.findMany()
	if (!tags) {
		return NextResponse.json({ tags: [] })
	}
	return NextResponse.json({ tags })
}
