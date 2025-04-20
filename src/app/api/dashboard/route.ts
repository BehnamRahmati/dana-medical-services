import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const [usersCount, postsCount, likesCount, viewsCount, commentsCount] = await prisma.$transaction([
			prisma.user.count(),
			prisma.article.count(),
			prisma.like.count({ where: { comment: null } }),
			prisma.view.count(),
			prisma.comment.count({ where: { parent: null } }),
		])

		const data = {
			usersCount,
			postsCount,
			likesCount,
			viewsCount,
			commentsCount,
		}

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
