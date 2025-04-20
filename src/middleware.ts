import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const allowedRoles = ['ADMIN', 'SUPERADMIN']
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [process.env.NEXTAUTH_URL].filter(Boolean) // Filter out potential undefined values if NEXTAUTH_URL isn't set

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const origin = request.headers.get('Origin') // This can be null for same-origin requests

	if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
		const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
		if (token && token.role) {
			const url = request.nextUrl.clone()
			url.pathname = '/'
			return NextResponse.redirect(url)
		}

		return NextResponse.next()
	}

	if (pathname.startsWith('/api/')) {
		if (origin && !allowedOrigins.includes(origin)) {
			// Check if origin exists AND is not allowed
			console.log(`Origin ${origin} blocked for API access.`) // Log blocked origin

			return new NextResponse(null, {
				status: 403,
				statusText: 'Forbidden: Invalid Origin', // More specific status text
				headers: {
					'Content-Type': 'text/plain',
				},
			})
		}

		return NextResponse.next()
	}

	if (pathname.startsWith('/dashboard')) {
		console.log('Dashboard route accessed')
		// Get the token containing user information
		// Ensure you have NEXTAUTH_SECRET set in your environment variables
		const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

		// Check if the user is authenticated and has an allowed role
		if (!token || !token.role || !allowedRoles.includes(token.role as string)) {
			const url = request.nextUrl.clone()
			url.pathname = '/login'
			return NextResponse.redirect(url)
		}

		return NextResponse.next()
	}

	return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
	matcher: ['/login', '/register', '/api/:path*', '/dashboard/:path*'],
}
