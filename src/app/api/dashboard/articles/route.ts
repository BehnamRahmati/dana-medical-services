import { prisma } from '@/lib/prisma'
import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function GET() {
	const articles = await prisma.article.findMany({
		include: {
			tags: true,
			category: true,
			author: {
				select: {
					name: true,
				},
			},
		},
	})
	if (!articles) {
		return NextResponse.json({ articles: [] })
	}
	return NextResponse.json({ articles })
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

		const article = await prisma.article.create({
			data: {
				title: formData.get('title') as string,
				slug: formData.get('slug') as string,
				thumbnail: `/uploads/${fileName}`,
				excerpt: formData.get('excerpt') as string,
				content: formData.get('content') as string,
				readTime: formData.get('readTime') ? parseInt(formData.get('readTime') as string, 10) : 0,
				status: formData.get('status') as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
				category: { connect: { id: formData.get('category') as string } },
				author: { connect: { id: formData.get('author') as string } },
				tags: { connect: { id: formData.get('tag') as string } },
			},
		})

		if (!article) {
			throw new Error('failed to create article')
		}

		return NextResponse.json({ message: 'Article created successfully', article }, { status: 201 })
	} catch (error) {
		return NextResponse.json({ error, message: 'Error creating article' }, { status: 500 })
	}
}

export async function PUT(req: NextRequest) {
	try {
		const formData = await req.formData()
		const file = formData.get('thumbnail') as File
		// Ensure the file exists and is not a simple string
		if (!file || typeof file === 'string') {
			console.log('sfgvsg')

			const article = await prisma.article.update({
				where: {
					id: formData.get('id') as string,
				},
				data: {
					title: formData.get('title') as string,
					slug: formData.get('slug') as string,
					excerpt: formData.get('excerpt') as string,
					content: formData.get('content') as string,
					readTime: formData.get('readTime') ? parseInt(formData.get('readTime') as string, 10) : 0,
					status: formData.get('status') as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
					category: { connect: { id: formData.get('category') as string } },
					author: { connect: { id: formData.get('author') as string } },
					tags: { connect: { id: formData.get('tag') as string } },
				},
			})

			if (!article) {
				throw new Error('failed to create article')
			}

			return NextResponse.json({ message: 'Article created successfully', article }, { status: 201 })
		}

		const fileName = await handleUpload(file)

		const article = await prisma.article.update({
			where: {
				slug: formData.get('slug') as string,
			},
			data: {
				title: formData.get('title') as string,
				slug: formData.get('slug') as string,
				thumbnail: `/uploads/${fileName}`,
				excerpt: formData.get('excerpt') as string,
				content: formData.get('content') as string,
				readTime: formData.get('readTime') ? parseInt(formData.get('readTime') as string, 10) : 0,
				status: formData.get('status') as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
				category: { connect: { id: formData.get('category') as string } },
				author: { connect: { id: formData.get('author') as string } },
				tags: { connect: { id: formData.get('tag') as string } },
			},
		})
		if (!article) {
			throw new Error('failed to create article')
		}

		return NextResponse.json({ message: 'Article created successfully', article }, { status: 201 })
	} catch (error) {
		return NextResponse.json({ error, message: 'Error creating article' }, { status: 500 })
	}
}

export async function handleUpload(file: File) {
	// Convert the file into a buffer
	const fileBuffer = Buffer.from(await file.arrayBuffer())

	// Define the path where the file will be saved
	const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

	// Make sure the uploads directory exists
	if (!fs.existsSync(uploadsDir)) {
		fs.mkdirSync(uploadsDir, { recursive: true })
	}

	// Create a unique file name or use the original name
	const fileName = file.name // Consider adding a timestamp or unique identifier
	const filePath = path.join(uploadsDir, fileName)

	// Write the file to disk
	await fs.promises.writeFile(filePath, fileBuffer)

	return fileName
}
