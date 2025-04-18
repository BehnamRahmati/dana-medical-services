'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import ProfileContent from './content/profile-content'
import ProfileHeader from './header/profile-header'

export default function Profile() {
	const { data: session, status } = useSession()
	const { data: user, isLoading } = useSWR(`/api/users/${session?.user?.id}`, async (url: string) => {
		const response = await axios.get(url)
		return response.data.user
	})

	if (status === 'loading') return <div>Loading...</div>
	if (status === 'unauthenticated' || !session) return <div>Unauthenticated</div>

	if (isLoading) return <div>Loading...</div>

	return (
		<>
			<div className='bg-primary h-96 -mt-52'></div>
			<div className='container mx-auto px-2.5 lg:px-5 py-10'>
				<ProfileHeader
					image={user.image}
					name={user.name}
					email={user.email}
					comments={user._count.comments}
					likes={user._count.likes}
					requests={user._count.requests}
				/>
				<ProfileContent />
			</div>
		</>
	)
}
