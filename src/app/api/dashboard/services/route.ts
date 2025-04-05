import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	const services = await prisma.service.findMany({
		include: {
			author: {
				select: {
					name: true,
				},
			},
		},
	})
	if (!services) {
		return NextResponse.json({ services: [] })
	}
	return NextResponse.json({ services })
}
