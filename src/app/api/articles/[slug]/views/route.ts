import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug
		const article = await prisma.article.update({
			where: { slug },
			data: {
				views: {
					increment: 1,
				},
			},
		})

		if (!article) {
			throw new Error('خطا در افزایش بازدیدها')
		}
		return NextResponse.json({ message: 'بازدیدها با موفقیت افزایش یافت', article }, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{
				message: 'خطا در افزایش بازدیدها',
				error,
			},
			{ status: 200 },
		)
	}
}
