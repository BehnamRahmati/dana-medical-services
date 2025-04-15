import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const id = (await params).id
		const item = await prisma.serviceItem.delete({
			where: {
				id,
			},
		})
		if (!item) {
			throw new Error('Item not found')
		}
		return NextResponse.json(
			{
				item,
			},
			{ status: 200 },
		)
	} catch (error) {
		console.log(error)
		return NextResponse.json(
			{
				error,
			},
			{ status: 500 },
		)
	}
}
