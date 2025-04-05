import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { handleUpload } from '../articles/route'

export async function POST(req: NextRequest) {
	const formData = await req.formData()
	const file = formData.get('file') as File
	// Ensure the file exists and is not a simple string
	if (!file || typeof file === 'string') {
		return NextResponse.json('File not found or invalid file type', { status: 400 })
	}

	const fileExists = await prisma.file.findFirst({
		where: {
			filename: file.name,
		},
	})

	if (fileExists) {
		return NextResponse.json({ file: fileExists }, { status: 200 })
	}

	const filename = await handleUpload(file)

	const fileServer = await prisma.file.create({
		data: {
			filename: filename,
			url: `/uploads/${filename}`,
			size: file.size,
		},
	})

	if (!fileServer) {
		return NextResponse.json('File not found or invalid file type', { status: 400 })
	}

	return NextResponse.json({ file: fileServer }, { status: 200 })
}
