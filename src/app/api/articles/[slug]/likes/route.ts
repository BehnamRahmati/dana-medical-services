import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		const { userId } = await req.json()

		if (!userId || !slug) {
			throw new Error('userId شناسایی نشد')
		}

		// First find the article by slug
		const article = await prisma.article.findUnique({
			where: { slug },
			select: { id: true },
		})

		if (!article) {
			throw new Error('مقاله شناسایی نشد')
		}

		// Check if the like already exists
		const existingLike = await prisma.like.findFirst({
			where: {
				userId: userId,
				articleId: article.id,
				serviceId: null,
				commentId: null,
			},
		})

		let result

		if (existingLike) {
			// If like exists, delete it
			result = await prisma.like.delete({
				where: { id: existingLike.id },
			})
		} else {
			// If like doesn't exist, create it
			result = await prisma.like.create({
				data: {
					user: { connect: { id: userId } },
					article: { connect: { id: article.id } },
				},
			})
		}

		if (!result) throw new Error('خطا در عملیات لایک')

		// Get updated article with like count
		const updatedArticle = await prisma.article.findUnique({
			where: { slug },
			include: {
				_count: {
					select: { likes: true },
				},
			},
		})

		return NextResponse.json(
			{
				message: existingLike ? 'لایک با موفقیت حذف شد' : 'لایک با موفقیت اضافه شد',
				article: updatedArticle,
			},
			{ status: 200 },
		)
	} catch (error) {
		if (error instanceof Error) {
			console.log({ error })
		}

		return NextResponse.json(
			{
				message: 'خطا در عملیات لایک',
				error,
			},
			{ status: 200 },
		)
	}
}
