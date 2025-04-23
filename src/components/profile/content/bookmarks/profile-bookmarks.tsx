'use client'
import PostCard from '@/components/ui/post-card'
import ServicesCard from '@/components/ui/service-card'
import { TabsContent } from '@/components/ui/tabs'
import { H3 } from '@/components/ui/typography'
import { dataFetcher } from '@/lib/helpers'
import { TArticle, TService } from '@/lib/types'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export default function ProfileBookmarksContent({ activeTab }: { activeTab: string }) {
	const { data: session } = useSession()
	const { data, isLoading, error } = useSWR<{ bookmarkedArticles: TArticle[]; bookmarkedServices: TService[] }>(
		session?.user && activeTab === 'bookmarks' ? [`/api/profile/${session.user.id}/bookmarks`, 'profile-bookmarks'] : null,
		dataFetcher,
	)

	if (activeTab !== 'bookmarks') {
		return null
	}
	if (isLoading) return <p>loading</p>
	if (error) return <p>error</p>
	if (!data) return <p>no data</p>

	return (
		<TabsContent value='bookmarks'>
			<div className=''>
				<H3>مقالات نشان شده</H3>
				{data.bookmarkedArticles.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
						{data.bookmarkedArticles.map(article => (
							<PostCard key={article.id} article={article} />
						))}
					</div>
				) : (
					<p className='border-4 border-dashed border-border p-10 text-center w-full mt-10'>
						تا کنون هیچ مقاله ای را نشان نکرده اید.
					</p>
				)}
			</div>
			<div className='mt-10'>
				<H3>خدمات نشان شده</H3>
				{data.bookmarkedServices.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
						{data.bookmarkedServices.map(service => (
							<ServicesCard key={service.id} service={service} />
						))}
					</div>
				) : (
					<p className='border-4 border-dashed border-border p-10 text-center w-full mt-10'>
						تا کنون هیچ خدمتی را نشان نکرده اید.
					</p>
				)}
			</div>
		</TabsContent>
	)
}
