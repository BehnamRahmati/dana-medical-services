'use client'
import PostCard from '@/components/ui/post-card'
import ServicesCard from '@/components/ui/service-card'
import { TabsContent } from '@/components/ui/tabs'
import { H3 } from '@/components/ui/typography'
import { dataFetcher } from '@/lib/helpers'
import { TArticle, TService } from '@/lib/types'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export default function ProfileLikesContent({ activeTab }: { activeTab: string }) {
	const { data: session } = useSession()
	const { data, isLoading, error } = useSWR<{ likedArticles: TArticle[]; likedServices: TService[] }>(
		session?.user && activeTab === 'likes' ? [`/api/profile/${session.user.id}/likes`, 'profile-likes'] : null,
		dataFetcher,
	)
	if (activeTab !== 'likes') {
		return null
	}
	if (isLoading) return <p>loading</p>
	if (error) return <p>error</p>
	if (!data) return <p>no data</p>

	return (
		<TabsContent value='likes'>
			<div className=''>
				<H3>مقالات لایک شده</H3>
				{data.likedArticles.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
						{data.likedArticles.map(article => (
							<PostCard key={article.id} article={article} />
						))}
					</div>
				) : (
					<p className='border-4 border-dashed border-border p-10 text-center w-full mt-10'>
						تا کنون هیچ مقاله ای را لایک نکرده اید.{' '}
					</p>
				)}
			</div>
			<div className='mt-10'>
				<H3>خدمات لایک شده</H3>
				{data.likedServices.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 w-full'>
						{data.likedServices.map(service => (
							<ServicesCard key={service.id} service={service} />
						))}
					</div>
				) : (
					<p className='border-4 border-dashed border-border p-10 text-center w-full mt-10'>
						تا کنون هیچ خدمتی را لایک نکرده اید.
					</p>
				)}
			</div>
		</TabsContent>
	)
}
