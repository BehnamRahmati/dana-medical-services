import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const services = await prisma.service.findMany({
			where: {
				status: 'PUBLISHED' as const,
			},
			select: {
				thumbnail: true,
				title: true,
				slug: true,
				excerpt: true,
				id: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return NextResponse.json({ services }, { status: 200 })
	} catch (error) {
		if (error instanceof Error) {
			console.log({ error })
		}
		return NextResponse.json({ error }, { status: 500 })
	}
}
