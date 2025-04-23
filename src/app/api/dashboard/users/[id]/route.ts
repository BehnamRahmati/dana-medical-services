import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const id = (await params).id
		const { role } = await request.json()
		if (!id) {
			return NextResponse.json({ message: 'id parameter is missing' }, { status: 400 })
		}

		if (!role) {
			return NextResponse.json({ message: 'Role is required' }, { status: 401 })
		}

		const userExists = await prisma.user.findUnique({ where: { id }, select: { id: true } })

		if (!userExists) {
			return NextResponse.json({ message: 'couldnt find user' }, { status: 404 })
		}

		const user = await prisma.user.update({
			where: { id },
			data: {
				role,
			},
		})
		return NextResponse.json({ user }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
