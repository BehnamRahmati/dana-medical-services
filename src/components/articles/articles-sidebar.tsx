'use client'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { Filter } from 'iconsax-react'
import ArticleCategories from './sidebar/article-categories'
import ArticleSearch from './sidebar/article-search'
import ArticleTags from './sidebar/article-tags'

export default function ArticlesSidebar() {
	const isMobile = useIsMobile()
	if (isMobile)
		return (
			<Drawer>
				<DrawerTrigger className='flex items-center justify-center gap-2 w-[calc(100%-20px)] border border-border px-2.5 p-1 rounded-md mx-2.5'>
					<Filter className='fill-content size-6' variant='Bulk' />
					<span>فیلتر پیشرفته مقالات</span>
				</DrawerTrigger>
				<DrawerContent className='bg-accent'>
					<DrawerHeader>
						<DrawerTitle className='text-2xl text-center'>فیلتر مقالات</DrawerTitle>
					</DrawerHeader>
					<div className='p-2.5 overflow-y-auto flex flex-col gap-2.5'>
						<ArticleSearch />
						<ArticleTags />
						<ArticleCategories />
					</div>
				</DrawerContent>
			</Drawer>
		)
	return (
		<aside className='w-full lg:w-64 xl:w-72 2xl:w-80 flex-col gap-5 hidden lg:flex'>
			<ArticleSearch />
			<ArticleTags />
			<ArticleCategories />
		</aside>
	)
}
