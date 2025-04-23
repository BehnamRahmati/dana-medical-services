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
		const comments = await prisma.comment.findMany({ where: { user: { id } }, include: { article: true, service: true } })
		return NextResponse.json({ comments }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
