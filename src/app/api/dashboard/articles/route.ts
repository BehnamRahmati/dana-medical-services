import { prisma } from '@/lib/prisma'

import { NextRequest, NextResponse } from 'next/server'
import { getImageUrl, uploadImage } from '../file/file-services'

export async function GET() {
	const articles = await prisma.article.findMany({
		include: {
			tags: true,
			category: true,
			likes: true,
			bookmarks: true,
			views: true,
			comments: true,
			author: {
				select: {
					name: true,
				},
			},
			_count: {
				select: {
					likes: true,
					bookmarks: true,
					comments: true,
					views: true,
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

		const upload = await uploadImage(file)

		try {
			upload.on('httpUploadProgress', progress => {
				console.log(progress)
			})

			await upload.done()

			const permanentSignedUrl = getImageUrl(file.name)
			const tagsString = formData.get('tags') as string
			const tags = tagsString.split(',').map(tag => tag.trim())

			const article = await prisma.article.create({
				data: {
					title: formData.get('title') as string,
					slug: formData.get('slug') as string,
					thumbnail: permanentSignedUrl,
					excerpt: formData.get('excerpt') as string,
					content: formData.get('content') as string,
					read: formData.get('read') ? parseInt(formData.get('read') as string, 10) : 0,
					status: formData.get('status') as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
					category: { connect: { id: formData.get('category') as string } },
					author: { connect: { id: formData.get('author') as string } },
					tags: { connect: tags.map(tag => ({ id: tag })) },
				},
			})

			if (!article) {
				throw new Error('failed to create article')
			}

			return NextResponse.json({ message: 'Article created successfully', article }, { status: 201 })
		} catch (error) {
			console.log(error)
			throw new Error('failed to create article')
		}
	} catch (error) {
		return NextResponse.json({ error, message: 'Error creating article' }, { status: 500 })
	}
}

export async function PUT(req: NextRequest) {
	try {
		const formData = await req.formData()
		const file = formData.get('thumbnail') as File
		// Ensure the file exists and is not a simple string
		let permanentSignedUrl
		if (file) {
			const upload = await uploadImage(file)
			try {
				upload.on('httpUploadProgress', progress => {
					console.log(progress)
				})

				await upload.done()

				permanentSignedUrl = getImageUrl(file.name)
			} catch (error) {
				console.log(error)
				throw new Error('failed to upload file')
			}
		}

		const tagsString = formData.get('tags') as string
		const tags = tagsString.split(',').map(tag => tag.trim())

		const article = await prisma.article.update({
			where: {
				slug: formData.get('slug') as string,
			},
			data: {
				title: formData.get('title') as string,
				slug: formData.get('slug') as string,
				...(permanentSignedUrl && { thumbnail: permanentSignedUrl }),
				excerpt: formData.get('excerpt') as string,
				content: formData.get('content') as string,
				read: formData.get('read') ? parseInt(formData.get('read') as string, 10) : 0,
				status: formData.get('status') as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
				category: { connect: { id: formData.get('category') as string } },
				author: { connect: { id: formData.get('author') as string } },
				tags: {
					set: [],
					connect: tags.map(tag => ({ id: tag })),
				},
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
