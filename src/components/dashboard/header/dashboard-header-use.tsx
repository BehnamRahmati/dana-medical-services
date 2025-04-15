'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
export default function DashboardHeaderUser() {
	const { data: session, status } = useSession()

	if (status === 'unauthenticated') return <div>unauthenticated</div>
	if (status === 'loading')
		return (
			<div className='flex items-center gap-2'>
				<div className=''>
					<Skeleton className='rounded-2xl size-10 bg-muted' />
				</div>
				<div className='mb-1'>
					<Skeleton className='w-12 h-4 bg-muted mb-1' />
					<Skeleton className='w-44 h-4 bg-muted' />
				</div>
			</div>
		)
	const isAdmin = session?.user.role === 'ADMIN' || session?.user.role === 'SUPERADMIN'
	return (
		<div className='flex items-center gap-2'>
			<Image
				src={session?.user.image || '#'}
				alt={session?.user.name || 'avatar'}
				width={32}
				height={32}
				loading='lazy'
				className='rounded-2xl size-10'
			/>
			<div className='mt-1.5'>
				<div className='font-bold leading-4 mb-1'>
					{session?.user.name}
					<div
						className={`text-xs font-light inline-block pb-0 pt-1.5 px-2.5 leading-4 rounded-md mr-4 ${isAdmin ? 'bg-secondary/20 text-secondary' : 'bg-content/10'}`}
					>
						{session?.user.role}
					</div>
				</div>
				<div className=' leading-4'>{session?.user.email}</div>
			</div>
		</div>
	)
}
