import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const usersCount = await prisma.user.count()
		const postsCount = await prisma.article.count()
		const commentsCount = await prisma.comment.count()
		const likesCount = await prisma.like.count()

		const data = {
			usersCount,
			postsCount,
			commentsCount,
			likesCount,
		}

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: error }, { status: 500 })
	}
}
