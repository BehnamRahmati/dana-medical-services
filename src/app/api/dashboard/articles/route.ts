import { handleUpload } from '@/lib/backend.helpers'
import { prisma } from '@/lib/prisma'

import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	const articles = await prisma.article.findMany({
		include: {
			tags: true,
			category: true,
			likes: true,
			bookmarks: true,
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
				read: formData.get('read') ? parseInt(formData.get('read') as string, 10) : 0,
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
					read: formData.get('read') ? parseInt(formData.get('read') as string, 10) : 0,
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
				read: formData.get('read') ? parseInt(formData.get('read') as string, 10) : 0,
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
