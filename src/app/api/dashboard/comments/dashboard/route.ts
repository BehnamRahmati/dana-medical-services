import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const comments = await prisma.comment.findMany({
			include: {
				user: {
					select: {
						name: true,
						id: true,
						image: true,
					},
				},
			},
			take: 4,
			orderBy: {
				createdAt: 'desc',
			},
		})
		return NextResponse.json({ comments }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
