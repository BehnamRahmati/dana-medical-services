'use server'

import fs from 'fs'
import path from 'path'
import { prisma } from './prisma'

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

export async function fetchLastFourArticle() {
	return await prisma.article.findMany({
		where: {
			status: {
				equals: 'PUBLISHED' as const,
			},
		},
		select: {
			id: true,
			title: true,
			read: true,
			excerpt: true,
			thumbnail: true,
			slug: true,
			category: {
				select: {
					name: true,
					slug: true,
				},
			},
			author: {
				select: {
					name: true,
					image: true,
				},
			},
			_count: {
				select: { likes: true, comments: true, bookmarks: true },
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
		take: 4,
	})
}

export async function fetchArticle(slug: string) {
	return await prisma.article.findUnique({
		where: { slug },
		include: {
			tags: true,
			category: true,
			author: {
				select: {
					name: true,
					image: true,
				},
			},
			_count: {
				select: { likes: true, comments: true, bookmarks: true },
			},
		},
	})
}

export async function fetchService(slug: string) {
	return await prisma.service.findUnique({
		where: { slug },
		include: {
			category: {
				select: {
					name: true,
					slug: true,
				},
			},
			author: {
				select: {
					name: true,
					image: true,
				},
			},
			comments: true,
			serviceItems: true,
			_count: {
				select: { likes: true, comments: true, bookmarks: true },
			},
		},
	})
}
