import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ProfileContent() {
	return (
		<Tabs
			defaultValue='likes'
			className='w-full lg:w-2/3 mt-5 lg:mt-10 lg:mx-auto bg-accent rounded-xl p-2.5 lg:p-5'
			dir='rtl'
		>
			<TabsList className='gap-5 w-full justify-start overflow-auto bg-accent border border-border mb-2.5 lg:mb-5'>
				<TabsTrigger value='likes'>لایک ها</TabsTrigger>
				<TabsTrigger value='comments'>کامنت ها</TabsTrigger>
				<TabsTrigger value='bookmarks'>نشان شده ها</TabsTrigger>
				<TabsTrigger value='requests'>درخواست ها</TabsTrigger>
				<TabsTrigger value='password'>تغییر رمز عبور</TabsTrigger>
			</TabsList>
			<TabsContent value='likes'>Make changes to your account here.</TabsContent>
			<TabsContent value='comments'>Change your comments here.</TabsContent>
			<TabsContent value='bookmarks'>Change your bookmarks here.</TabsContent>
			<TabsContent value='requests'>Change your requests here.</TabsContent>
			<TabsContent value='password'>Change your password here.</TabsContent>
		</Tabs>
	)
}
