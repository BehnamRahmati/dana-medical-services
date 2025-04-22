import { prisma } from '@/lib/prisma'

import { NextRequest, NextResponse } from 'next/server'
import { getImageUrl, uploadImage } from '../file/file-services'

export async function GET() {
	try {
		const articles = await prisma.article.findMany({
			include: {
				tags: true,
				category: true,
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
			orderBy: {
				createdAt: 'desc',
			},
		})
		return NextResponse.json({ articles }, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData()

		// --- Extract and Validate Form Data ---
		const title = formData.get('title') as string
		const slug = formData.get('slug') as string
		const excerpt = formData.get('excerpt') as string
		const content = formData.get('content') as string
		const readString = formData.get('read') as string
		const status = formData.get('status') as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
		const categoryId = formData.get('category') as string
		const authorId = formData.get('author') as string
		const tagsString = formData.get('tags') as string
		const file = formData.get('thumbnail') as File | null

		if (
			!title ||
			!slug ||
			!content ||
			!status ||
			!categoryId ||
			!authorId ||
			!tagsString ||
			!file ||
			!excerpt ||
			!readString
		) {
			return NextResponse.json(
				{ message: 'Missing required fields (title, slug, content, status, category, author)' },
				{ status: 400 },
			)
		}

		if (!['DRAFT', 'PUBLISHED', 'ARCHIVED'].includes(status)) {
			return NextResponse.json({ message: 'Invalid status value' }, { status: 400 })
		}

		let permanentSignedUrl: string | undefined = undefined
		if (file && typeof file !== 'string' && file.size > 0) {
			try {
				const upload = await uploadImage(file)
				upload.on('httpUploadProgress', progress => {
					console.log(progress)
				})
				await upload.done()
				permanentSignedUrl = getImageUrl(file.name)
			} catch (uploadError) {
				console.error('File upload failed:', uploadError)
				return NextResponse.json({ message: 'Failed to upload thumbnail' }, { status: 500 })
			}
		} else {
			return NextResponse.json({ message: 'Thumbnail file is required' }, { status: 400 }) // Make thumbnail required on create
		}

		// --- Check Existence & Uniqueness Concurrently ---
		const tagIds = tagsString
			? tagsString
					.split(',')
					.map(tag => tag.trim())
					.filter(id => id)
			: []
		const [existingSlug, categoryExists, authorExists, existingTags] = await Promise.all([
			prisma.article.findUnique({ where: { slug }, select: { id: true } }),
			prisma.category.findUnique({ where: { id: categoryId }, select: { id: true } }),
			prisma.user.findUnique({ where: { id: authorId }, select: { id: true } }), // Assuming author is a User
			tagIds.length > 0
				? prisma.tag.findMany({ where: { id: { in: tagIds } }, select: { id: true } })
				: Promise.resolve([]),
		])

		if (existingSlug) {
			return NextResponse.json({ message: `Article with slug '${slug}' already exists` }, { status: 409 }) // Conflict
		}
		if (!categoryExists) {
			return NextResponse.json({ message: `Category with ID '${categoryId}' not found` }, { status: 400 })
		}
		if (!authorExists) {
			return NextResponse.json({ message: `Author with ID '${authorId}' not found` }, { status: 400 })
		}
		// Verify all provided tag IDs were found
		if (existingTags.length !== tagIds.length) {
			const foundIds = new Set(existingTags.map(t => t.id))
			const notFoundIds = tagIds.filter(id => !foundIds.has(id))
			return NextResponse.json({ message: `Tags not found: ${notFoundIds.join(', ')}` }, { status: 400 })
		}

		// --- Create Article ---
		const article = await prisma.article.create({
			data: {
				title,
				slug,
				thumbnail: permanentSignedUrl,
				excerpt,
				content,
				read: readString ? parseInt(readString, 10) : 0,
				status,
				category: { connect: { id: categoryId } },
				author: { connect: { id: authorId } },
				tags: { connect: tagIds.map(id => ({ id })) },
			},
			include: {
				category: true,
				author: { select: { id: true, name: true } },
				tags: true,
			},
		})

		return NextResponse.json({ message: 'Article created successfully', article }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error, message: 'Error creating article' }, { status: 500 })
	}
}

export async function PUT(req: NextRequest) {
	try {
		const formData = await req.formData()
		// --- Extract and Validate Form Data ---
		const articleId = formData.get('id') as string // Need the current slug to find the article
		const title = formData.get('title') as string
		const slug = formData.get('slug') as string // The potentially updated slug
		const excerpt = formData.get('excerpt') as string
		const content = formData.get('content') as string
		const readStr = formData.get('read') as string
		const status = formData.get('status') as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
		const categoryId = formData.get('category') as string
		const authorId = formData.get('author') as string
		const tagsString = formData.get('tags') as string
		const file = formData.get('thumbnail') as File | null

		if (!articleId) {
			return NextResponse.json({ message: 'Missing currentSlug to identify article for update' }, { status: 400 })
		}
		if (!title || !slug || !content || !status || !categoryId || !authorId) {
			return NextResponse.json(
				{ message: 'Missing required fields (title, slug, content, status, category, author)' },
				{ status: 400 },
			)
		}
		if (!['DRAFT', 'PUBLISHED', 'ARCHIVED'].includes(status)) {
			return NextResponse.json({ message: 'Invalid status value' }, { status: 400 })
		}

		// --- File Upload (if provided) ---
		let permanentSignedUrl: string | undefined = undefined
		if (file && typeof file !== 'string' && file.size > 0) {
			try {
				const upload = await uploadImage(file)
				await upload.done()
				permanentSignedUrl = getImageUrl(file.name)
			} catch (uploadError) {
				console.error('File upload failed:', uploadError)
				return NextResponse.json({ message: 'Failed to upload thumbnail' }, { status: 500 })
			}
		}

		// --- Check Existence & Uniqueness Concurrently ---
		const tagIds = tagsString
			? tagsString
					.split(',')
					.map(tag => tag.trim())
					.filter(id => id)
			: []
		const [articleToUpdate, categoryExists, authorExists, existingTags] = await Promise.all([
			prisma.article.findUnique({ where: { id: articleId }, select: { id: true } }),
			prisma.category.findUnique({ where: { id: categoryId }, select: { id: true } }),
			prisma.user.findUnique({ where: { id: authorId }, select: { id: true } }),
			tagIds.length > 0
				? prisma.tag.findMany({ where: { id: { in: tagIds } }, select: { id: true } })
				: Promise.resolve([]),
		])

		if (!articleToUpdate) {
			return NextResponse.json({ message: `Article with slug '${articleId}' not found` }, { status: 404 })
		}
		if (!categoryExists) {
			return NextResponse.json({ message: `Category with ID '${categoryId}' not found` }, { status: 400 })
		}
		if (!authorExists) {
			return NextResponse.json({ message: `Author with ID '${authorId}' not found` }, { status: 400 })
		}
		if (existingTags.length !== tagIds.length) {
			const foundIds = new Set(existingTags.map(t => t.id))
			const notFoundIds = tagIds.filter(id => !foundIds.has(id))
			return NextResponse.json({ message: `Tags not found: ${notFoundIds.join(', ')}` }, { status: 400 })
		}

		// --- Update Article ---
		const article = await prisma.article.update({
			where: {
				id: articleId,
			},
			data: {
				title,
				slug,
				...(permanentSignedUrl && { thumbnail: permanentSignedUrl }),
				excerpt,
				content,
				read: readStr ? parseInt(readStr, 10) : 0,
				status,
				category: { connect: { id: categoryId } },
				author: { connect: { id: authorId } },
				tags: {
					set: [],
					connect: tagIds.map(id => ({ id })),
				},
			},
			include: {
				// Include relations in response
				category: true,
				author: { select: { id: true, name: true } },
				tags: true,
			},
		})

		return NextResponse.json({ message: 'Article updated successfully', article }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error, message: 'Error creating article' }, { status: 500 })
	}
}
