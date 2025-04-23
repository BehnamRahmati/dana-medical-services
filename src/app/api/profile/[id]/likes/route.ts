import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const id = (await params).id
		if (!id) {
			return NextResponse.json({ message: 'id is required' }, { status: 400 })
		}
		const userExists = await prisma.user.findUnique({ where: { id }, select: { id: true } })
		if (!userExists) {
			return NextResponse.json({ message: 'couldnt find user' }, { status: 404 })
		}

		const likedArticles = await prisma.article.findMany({
			where: {
				likes: {
					some: {
						user: { id },
					},
				},
			},
			select: {
				title: true,
				slug: true,
				thumbnail: true,
				read: true,
				author: {
					select: {
						name: true,
						image: true,
					},
				},
				category: {
					select: {
						name: true,
						slug: true,
					},
				},
				_count: {
					select: {
						likes: true,
						comments: true,
						bookmarks: true,
					},
				},
			},
		})
		const likedServices = await prisma.service.findMany({
			where: {
				likes: {
					some: {
						user: { id },
					},
				},
			},
			select: {
				title: true,
				slug: true,
				read: true,
				thumbnail: true,
				category: {
					select: {
						name: true,
						slug: true,
					},
				},
				author: {
					select: {
						name: true,
						image: true,
					},
				},
			},
		})
		return NextResponse.json({ likedArticles, likedServices }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
