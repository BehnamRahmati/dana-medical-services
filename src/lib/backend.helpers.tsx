'use server'

import fs from 'fs'
import path from 'path'

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
