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
	const userId = session?.user?.id
	const shouldFetch = userId && status === 'authenticated'
	const {
		data: userData,
		isLoading: isUserDataLoading,
		error: userDataError,
	} = useSWR<{ user: TUser }>(shouldFetch ? [`/api/users/${userId}`, 'user-profile'] : null, dataFetcher)

	const isLoading = status === 'loading' || (status === 'authenticated' && isUserDataLoading)

	const renderLoading = () => {
		return (
			<>
				<div className='container mx-auto'>
					<div className='flex flex-col lg:flex-row  lg:items-stretch gap-5 -mt-36'>
						<Skeleton className='size-56 rounded-4xl' />
						<Skeleton className='h-56 rounded-4xl flex-1' />
					</div>
				</div>
			</>
		)
	}

	if (status === 'unauthenticated') return <div>برای مشاهده پروفایل وارد حساب کاربری خود شوید.</div>

	return (
		<>
			<div className='bg-secondary h-96 -mt-52'></div>
			<div className='container mx-auto px-2.5 lg:px-5 py-10'>
				{isLoading && renderLoading()}
				{userDataError && (
					<p className='p-10 text-center text-xl border-dashed border-border border-4 mt-20'>
						خطا در بارگذاری اطلاعات پروفایل
					</p>
				)}
				{!userData && !isLoading && (
					<p className='p-10 text-center text-xl border-dashed border-border border-4 mt-20'>اطلاعات کاربری یافت نشد</p>
				)}
				{!isLoading && userData && !userDataError && (
					<ProfileHeader
						image={userData.user.image}
						name={userData.user.name}
						email={userData.user.email}
						comments={userData.user._count.comments}
						likes={userData.user._count.likes}
						requests={userData.user._count.requests}
					/>
				)}

				<ProfileContent />
				<div className='px-2.5 lg:px-5'>
					<div className='p-10 text-center text-xl border-dashed border-border border-4 mt-20'>Still working on it</div>
				</div>
			</div>
		</>
	)
}
