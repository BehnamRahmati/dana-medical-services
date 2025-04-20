import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const users = await prisma.user.findMany()
		return NextResponse.json({ users }, { status: 200 })
	} catch (error) {
		if (error instanceof Error) {
			console.log({ error })
		}
		return NextResponse.json({ error }, { status: 500 })
	}
}
