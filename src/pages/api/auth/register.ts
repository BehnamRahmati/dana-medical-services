import { prisma } from '@/lib/prisma' // Adjust path if needed
import bcrypt from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'

// Define expected request body structure (optional but good practice)
type RegisterRequestBody = {
	email: string
	password: string
	firstname: string
	lastname: string
}

// Define possible response data structure
type RegisterResponseData = {
	message: string
	userId?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<RegisterResponseData>) {
	// Only allow POST requests
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST'])
		return res.status(405).json({ message: `Method ${req.method} Not Allowed` })
	}

	const { email, password, firstname, lastname } = req.body as RegisterRequestBody

	// Basic validation
	if (!email || !password || !lastname || !firstname) {
		return res.status(400).json({ message: 'Email and password are required' })
	}

	// More specific validation (e.g., password length) - Zod on frontend handles some of this
	if (password.length < 6) {
		return res.status(400).json({ message: 'Password must be at least 6 characters long' })
	}

	try {
		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email: email.toLowerCase() },
		})

		if (existingUser) {
			return res.status(409).json({ message: 'Email already in use' })
		}

		const saltRounds = 10
		const hashedPassword = await bcrypt.hash(password, saltRounds)

		// Create the new user in the database
		const newUser = await prisma.user.create({
			data: {
				name: `${firstname} ${lastname}`,
				email: email.trim().toLowerCase(),
				hashedPassword: hashedPassword,
			},
		})

		return res.status(201).json({ message: 'User registered successfully', userId: newUser.id })
	} catch (error) {
		console.error('Registration API Error:', error)
		return res.status(500).json({ message: 'Internal Server Error' })
	}
}
