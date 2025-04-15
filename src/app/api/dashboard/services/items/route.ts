import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	try {
		const serviceItems = await prisma.serviceItem.findMany({ include: { service: true } })
		if (!serviceItems) throw new Error('coudnt find any service item')
		return NextResponse.json({ serviceItems }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	try {
		const { title, serviceId, price, discount, description } = await req.json()
		if (!title || !serviceId || !price || !description) throw new Error('missing fields')
		const serviceItem = await prisma.serviceItem.create({
			data: {
				title,
				service: { connect: { id: serviceId } },
				price: parseInt(price),
				discount: parseInt(discount),
				description,
			},
		})

		if (!serviceItem) throw new Error('coudnt create service item')

		return NextResponse.json({ serviceItem }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
