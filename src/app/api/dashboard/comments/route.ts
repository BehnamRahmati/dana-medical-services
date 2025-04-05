import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	const comments = await prisma.comment.findMany()
	if (!comments) {
		return NextResponse.json({ comments: [] })
	}
	return NextResponse.json({ comments })
}
