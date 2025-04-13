import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const users = await prisma.user.findMany({
			where: { role: { in: ['ADMIN', 'SUPERADMIN'] } },
			select: { name: true, id: true },
		})
		if (!users) {
			return NextResponse.json({ users: [] })
		}
		return NextResponse.json({ users })
	} catch (error) {
		console.error('Error fetching users:', error)
		return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
	}
}
