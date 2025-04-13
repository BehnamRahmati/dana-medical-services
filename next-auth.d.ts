import 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			name?: string | null
			email?: string | null
			image?: string | null
			role: 'ADMIN' | 'USER' | 'MODERATOR'
		}
	}

	interface User {
		id: string
		role: 'ADMIN' | 'USER' | 'MODERATOR'
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		userId: string
		userRole: 'ADMIN' | 'USER' | 'MODERATOR'
	}
}
