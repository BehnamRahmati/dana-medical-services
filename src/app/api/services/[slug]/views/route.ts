import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const slug = (await params).slug

		if (!slug) {
			return NextResponse.json({ message: 'Slug parameter is missing' }, { status: 400 })
		}

		// Get IP address and user agent from request
		const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
		const userAgent = req.headers.get('user-agent') || 'unknown'

		// First find the article by slug
		const service = await prisma.service.findUnique({
			where: { slug },
			select: { id: true },
		})

		if (!service) {
			return NextResponse.json({ message: 'service not found' }, { status: 404 })
		}

		// Create a new view record
		await prisma.view.create({
			data: {
				service: { connect: { id: service.id } },
				ipAddress: ipAddress.toString(),
				userAgent,
			},
		})

		return NextResponse.json(
			{
				message: 'views recorded successfully',
			},
			{ status: 200 },
		)
	} catch (error) {
		console.error('Error recording view:', error)
		return NextResponse.json(
			{
				message: 'Failed to record view',
				error,
			},
			{ status: 500 },
		)
	}
}
