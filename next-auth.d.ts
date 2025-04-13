import { TRole } from '@/lib/types'
import 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			name?: string | null
			email?: string | null
			image?: string | null
			role?: TRole
		}
	}

	interface User {
		id: string
		role: TRole
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		userId: string
		userRole: TRole
	}
}
