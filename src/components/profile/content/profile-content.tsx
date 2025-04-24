'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import dynamic from 'next/dynamic'
import { useState } from 'react'
const ProfileBookmarksContent = dynamic(() => import('./bookmarks/profile-bookmarks'))
const ProfileComments = dynamic(() => import('./comments/profile-comments'))
const ProfileLikesContent = dynamic(() => import('./likes/profile-likes-content'))

export default function ProfileContent() {
	const [activeTab, setActiveTab] = useState('likes')
	return (
		<Tabs
			defaultValue='likes'
			onValueChange={setActiveTab}
			className='w-full lg:w-3/4 2xl:w-2/3 mt-5 lg:mt-10 lg:mx-auto bg-accent rounded-xl p-2.5 lg:p-5'
			dir='rtl'
		>
			<TabsList className='gap-5 w-full justify-start overflow-auto bg-accent border border-border mb-2.5 lg:mb-5'>
				<TabsTrigger value='likes'>لایک ها</TabsTrigger>
				<TabsTrigger value='comments'>کامنت ها</TabsTrigger>
				<TabsTrigger value='bookmarks'>نشان شده ها</TabsTrigger>
				<TabsTrigger value='requests'>درخواست ها</TabsTrigger>
				<TabsTrigger value='password'>تغییر رمز عبور</TabsTrigger>
			</TabsList>
			<ProfileLikesContent activeTab={activeTab} />
			<ProfileComments activeTab={activeTab} />
			<ProfileBookmarksContent activeTab={activeTab} />
			<TabsContent value='requests'>Change your requests here.</TabsContent>
			<TabsContent value='password'>Change your password here.</TabsContent>
		</Tabs>
	)
}
