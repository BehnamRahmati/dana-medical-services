import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const id = (await params).id

		const requestExists = await prisma.request.findUnique({
			where: {
				id,
			},
		})

		if (!requestExists) {
			return NextResponse.json({ message: 'Request not found' }, { status: 404 })
		}
		const request = await prisma.request.delete({
			where: {
				id,
			},
		})
		return NextResponse.json({ request }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const id = (await params).id
		const { status } = await req.json()

		if (!status) {
			return NextResponse.json({ message: 'Request ID and status are required' }, { status: 400 })
		}

		const allowedStatuses = ['PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED']
		if (!allowedStatuses.includes(status)) {
			return NextResponse.json({ message: `Invalid status value: ${status}` }, { status: 401 })
		}

		const requestExists = await prisma.request.findUnique({
			where: { id },
			select: { id: true },
		})

		if (!requestExists) {
			return NextResponse.json({ message: `Request with ID ${id} not found` }, { status: 404 })
		}

		const request = await prisma.request.update({
			where: { id },
			data: { status },
		})
		return NextResponse.json({ request }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
