import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug

		// Get IP address and user agent from request
		const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
		const userAgent = req.headers.get('user-agent') || 'unknown'

		// First find the article by slug
		const article = await prisma.article.findUnique({
			where: { slug },
			select: { id: true },
		})

		if (!article) {
			throw new Error('مقاله یافت نشد')
		}

		// Create a new view record
		await prisma.view.create({
			data: {
				article: { connect: { id: article.id } },
				ipAddress: ipAddress.toString(),
				userAgent,
			},
		})

		// Also increment the read counter on the article
		const updatedArticle = await prisma.article.update({
			where: { id: article.id },
			data: {
				read: { increment: 1 },
			},
			include: {
				_count: {
					select: { views: true },
				},
			},
		})

		return NextResponse.json(
			{
				message: 'بازدید با موفقیت ثبت شد',
				article: updatedArticle,
			},
			{ status: 200 },
		)
	} catch (error) {
		console.error('Error recording view:', error)
		return NextResponse.json(
			{
				message: 'خطا در ثبت بازدید',
				error,
			},
			{ status: 500 },
		)
	}
}
