import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const id = (await params).id

		const commentExists = await prisma.comment.findUnique({
			where: { id },
		})

		if (!commentExists) {
			return NextResponse.json({ message: 'comment not found' }, { status: 404 })
		}
		const comment = await prisma.comment.delete({
			where: { id },
		})
		return NextResponse.json({ comment }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
