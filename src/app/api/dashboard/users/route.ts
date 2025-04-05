import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	const users = await prisma.user.findMany()
	if (!users) {
		return NextResponse.json({ users: [] })
	}
	return NextResponse.json({ users })
}
