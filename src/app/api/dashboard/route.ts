import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const usersCount = await prisma.user.count()
		const postsCount = await prisma.article.count()
		const likesCount = await prisma.like.count({ where: { comment: null } })
		const viewsCount = await prisma.view.count()
		const commentsCount = await prisma.comment.count({ where: { parent: null } })

		const data = {
			usersCount,
			postsCount,
			likesCount,
			viewsCount,
			commentsCount,
		}
		if (!data) {
			return NextResponse.json({ error: 'No data found' }, { status: 404 })
		}

		return NextResponse.json({ data }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: error }, { status: 500 })
	}
}
