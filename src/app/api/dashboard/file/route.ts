import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getImageUrl, uploadImage } from './file-services'

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData()
		const file = formData.get('file') as File
		// Ensure the file exists and is not a simple string
		if (!file || typeof file === 'string') {
			throw new Error('Invalid file')
		}
		const fileExists = await prisma.file.findFirst({
			where: {
				filename: file.name,
			},
		})
		if (fileExists) {
			return NextResponse.json({ file: fileExists }, { status: 200 })
		}

		const upload = await uploadImage(file)

		try {
			upload.on('httpUploadProgress', progress => {
				console.log(progress)
			})

			await upload.done()

			const permanentSignedUrl = getImageUrl(file.name)

			const fileServer = await prisma.file.create({
				data: {
					filename: file.name,
					url: permanentSignedUrl,
					size: file.size,
				},
			})

			if (!fileServer) {
				throw new Error('failed to create file')
			}

			return NextResponse.json({ file: fileServer }, { status: 200 })
		} catch (error) {
			console.log(error)
			return NextResponse.json({ error }, { status: 500 })
		}
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error }, { status: 500 })
	}
}
