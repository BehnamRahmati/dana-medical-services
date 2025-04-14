import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const id = (await params).id
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				articles: true,
				comments: true,
				likes: true,
				bookmarks: true,
				requests: true,
				_count: {
					select: {
						requests: true,
						comments: true,
						likes: true,
					},
				},
			},
		})

		if (!user) {
			throw new Error('User not found')
		}
		return NextResponse.json({
			user,
		})
	} catch (error) {
		console.log(error)
		return NextResponse.json(
			{
				message: 'Something went wrong',
			},
			{
				status: 500,
			},
		)
	}
}
