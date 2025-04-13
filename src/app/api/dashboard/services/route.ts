import { handleUpload } from '@/lib/backend.helpers'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	const services = await prisma.service.findMany({
		include: {
			author: {
				select: {
					name: true,
				},
			},
		},
	})
	if (!services) {
		return NextResponse.json({ services: [] })
	}
	return NextResponse.json({ services })
}

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData()
		const file = formData.get('thumbnail') as File
		// Ensure the file exists and is not a simple string
		if (!file || typeof file === 'string') {
			throw new Error('File not found or invalid file type')
		}

		const fileName = await handleUpload(file)

		const service = await prisma.service.create({
			data: {
				title: formData.get('title') as string,
				slug: formData.get('slug') as string,
				thumbnail: `/uploads/${fileName}`,
				excerpt: formData.get('excerpt') as string,
				content: formData.get('content') as string,
				read: formData.get('read') ? parseInt(formData.get('read') as string, 10) : 0,
				status: formData.get('status') as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
				author: { connect: { id: formData.get('author') as string } },
				category: { connect: { id: formData.get('category') as string } },
			},
		})

		if (!service) {
			throw new Error('failed to create service')
		}

		return NextResponse.json({ message: 'service created successfully', service }, { status: 201 })
	} catch (error) {
		return NextResponse.json({ error, message: 'Error creating service' }, { status: 500 })
	}
}

export async function PUT(req: NextRequest) {
	try {
		const formData = await req.formData()
		const file = formData.get('thumbnail') as File
		// Ensure the file exists and is not a simple string
		let fileName
		if (file) {
			fileName = await handleUpload(file)
		}

		const service = await prisma.service.update({
			where: {
				slug: formData.get('slug') as string,
			},
			data: {
				title: formData.get('title') as string,
				slug: formData.get('slug') as string,
				...(fileName && { thumbnail: `/uploads/${fileName}` }),
				excerpt: formData.get('excerpt') as string,
				content: formData.get('content') as string,
				read: formData.get('read') ? parseInt(formData.get('read') as string, 10) : 0,
				status: formData.get('status') as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
				author: { connect: { id: formData.get('author') as string } },
				category: { connect: { id: formData.get('category') as string } },
			},
		})
		if (!service) {
			throw new Error('failed to create service')
		}

		return NextResponse.json({ message: 'service created successfully', service }, { status: 201 })
	} catch (error) {
		console.log('failed to create service')
		return NextResponse.json({ error, message: 'Error creating service' }, { status: 500 })
	}
}
