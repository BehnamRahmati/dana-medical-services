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
					<Skeleton className='rounded-full size-10 bg-muted' />
				</div>
				<div className='mb-1'>
					<Skeleton className='w-12 h-5 bg-muted' />
					<Skeleton className='w-44 h-5 bg-muted' />
				</div>
			</div>
		)
	return (
		<div className='flex items-center gap-2'>
			<Image
				src={session?.user.image || '#'}
				alt={session?.user.name || 'avatar'}
				width={32}
				height={32}
				loading='lazy'
				className='rounded-full size-10'
			/>
			<div className='mt-1.5'>
				<div className='font-bold leading-4'>{session?.user.name}</div>
				<div className=' leading-4'>{session?.user.email}</div>
			</div>
		</div>
	)
}
