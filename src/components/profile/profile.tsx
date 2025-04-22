'use client'
import { dataFetcher } from '@/lib/helpers'
import { TUser } from '@/lib/types'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import ProfileContent from './content/profile-content'
import ProfileHeader from './header/profile-header'

export default function Profile() {
	const { data: session, status } = useSession()
	const { data, isLoading, error } = useSWR<{ user: TUser }>([`/api/users/${session?.user?.id}`, 'user-profile'], dataFetcher)

	if (status === 'loading') return <div>Loading...</div>
	if (status === 'unauthenticated' || !session) return <div>Unauthenticated</div>

	if (isLoading) return <div>Loading...</div>
	if (!data) {
		return <p>هیچ دیتایی یافت نشد</p>
	}
	if (error) return <p>خطا در بارگذاری دیتا</p>

	return (
		<>
			<div className='bg-primary h-96 -mt-52'></div>
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
			</div>
		</>
	)
}
