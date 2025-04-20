import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	try {
		const requests = await prisma.request.findMany({
			include: { service: true, expert: true },
			orderBy: { createdAt: 'desc' },
		})
		return NextResponse.json({ requests }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const { firstname, lastname, email, phone, notes, date, time, expertId, serviceId } = body

		if (!firstname || !lastname || !email || !phone || !date || !time || !expertId || !serviceId) {
			return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
		}

		const [expertExists, serviceExists] = await prisma.$transaction([
			prisma.user.findUnique({ where: { id: expertId }, select: { id: true } }),
			prisma.service.findUnique({ where: { id: serviceId }, select: { id: true } }),
		])

		if (!expertExists) {
			return NextResponse.json({ message: `Expert with ID ${expertId} not found` }, { status: 404 })
		}
		if (!serviceExists) {
			return NextResponse.json({ message: `Service with ID ${serviceId} not found` }, { status: 404 })
		}

		const request = await prisma.request.create({
			data: {
				name: `${firstname} ${lastname}`,
				email,
				phone,
				notes,
				requestedDate: new Date(date),
				requestedTime: time,
				expert: { connect: { id: expertId } },
				service: { connect: { id: serviceId } },
			},
		})
		return NextResponse.json({ request }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
