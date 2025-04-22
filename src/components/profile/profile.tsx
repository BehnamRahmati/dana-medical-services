'use client'
import { dataFetcher } from '@/lib/helpers'
import { TUser } from '@/lib/types'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { Skeleton } from '../ui/skeleton'
import ProfileContent from './content/profile-content'
import ProfileHeader from './header/profile-header'

export default function Profile() {
	const { data: session, status } = useSession()
	const { data, isLoading, error } = useSWR<{ user: TUser }>([`/api/users/${session?.user?.id}`, 'user-profile'], dataFetcher)
	const renderLoading = () => {
		return (
			<div>
				<div className='bg-secondary h-96 -mt-52'></div>
				<div className='container mx-auto px-2.5 lg:px-5 py-10'>
					<div className='flex flex-col lg:flex-row  lg:items-stretch gap-5 -mt-36'>
						<Skeleton className='size-56 rounded-4xl' />
						<Skeleton className='h-56 rounded-4xl flex-1' />
					</div>
				</div>
			</div>
		)
	}

	if (status === 'loading') return renderLoading()
	if (status === 'unauthenticated' || !session) return <div>Unauthenticated</div>

	if (isLoading) return renderLoading()
	if (!data) {
		return <p className='p-10 text-center text-xl border-dashed border-border border-4 mt-20'>هیچ دیتایی یافت نشد</p>
	}
	if (error) return <p className='p-10 text-center text-xl border-dashed border-border border-4 mt-20'>خطا در بارگذاری دیتا</p>

	return (
		<>
			<div className='bg-secondary h-96 -mt-52'></div>
			<div className='container mx-auto px-2.5 lg:px-5 py-10'>
				<ProfileHeader
					image={data.user.image}
					name={data.user.name}
					email={data.user.email}
					comments={data.user._count.comments}
					likes={data.user._count.likes}
					requests={data.user._count.requests}
				/>
				<ProfileContent />
				<div className='px-2.5 lg:px-5'>
					<div className='p-10 text-center text-xl border-dashed border-border border-4 mt-20'>Still working on it</div>
				</div>
			</div>
		</>
	)
}
