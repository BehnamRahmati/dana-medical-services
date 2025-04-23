'use client'
import { TabsContent } from '@/components/ui/tabs'
import { H3 } from '@/components/ui/typography'
import { dataFetcher } from '@/lib/helpers'
import { TComment } from '@/lib/types'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export default function ProfileCommentsContent({ activeTab }: { activeTab: string }) {
	const { data: session } = useSession()
	const { data, isLoading, error } = useSWR<{ comments: TComment[] }>(
		session?.user && activeTab === 'comments' ? [`/api/profile/${session.user.id}/comments`, 'profile-comments'] : null,
		dataFetcher,
	)

	if (activeTab !== 'comments') {
		return null
	}
	if (isLoading) return <p>loading</p>
	if (error) return <p>error</p>
	if (!data) return <p>no data</p>

	return (
		<TabsContent value='comments'>
			<div className=''>
				<H3>کامنت ها</H3>
				{data.comments.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 w-full'>
						{data.comments.map(comment => (
							<div key={comment.id} className='flex flex-col gap-5 p-5 border border-border rounded-xl'>
								<p className='line-clamp-3'>{comment.content}</p>
								<div className='flex flex-row gap-5'>
									<p>
										{comment.approved ? (
											<span className='text-green-500 bg-green-500/20 px-2.5 py-1 rounded-md'>
												تایید شده
											</span>
										) : (
											<span className='text-red-500 bg-red-500/20 px-2.5 py-1 rounded-md'>تایید نشده</span>
										)}
									</p>
									<p>{moment(comment.createdAt).locale('fa').fromNow()}</p>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className='border-4 border-dashed border-border p-10 text-center w-full mt-10'>
						تا کنون هیچ دیدگاهی ثبت نکرده اید.
					</p>
				)}
			</div>
		</TabsContent>
	)
}
