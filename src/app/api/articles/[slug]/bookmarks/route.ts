import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		const { userId } = await req.json()

		if (!userId || !slug) {
			throw new Error('userId شناسایی نشد')
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: { bookmarkedArticles: true },
		})

		if (!user) {
			throw new Error('user شناسایی نشد')
		}

		const alreadyBookmarked = user.bookmarkedArticles.some(article => article.slug === slug)

		const data = alreadyBookmarked
			? { bookmarks: { disconnect: { id: userId } } }
			: { bookmarks: { connect: { id: userId } } }

		const article = await prisma.article.update({ where: { slug }, data })

		if (!article) {
			throw new Error('خطا در افزایش نشان شده ها')
		}

		return NextResponse.json({ message: 'نشان شده ها با موفقیت افزایش یافت', article }, { status: 200 })
	} catch (error) {
		if (error instanceof Error) {
			console.log({ error })
		}

		return NextResponse.json(
			{
				message: 'خطا در افزایش نشان شده ها',
				error,
			},
			{ status: 200 },
		)
	}
}
