'use client'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarProvider,
	SidebarSeperator,
	SidebarTrigger,
} from '@/components/ui/sidebar-custom'
import { useIsMobile } from '@/hooks/use-mobile'
import { Category, Image, MenuBoard } from 'iconsax-react'
import Link from 'next/link'
import DashboardSidebarArticles from './sidebar-articles'
import DashboardSidebarComments from './sidebar-comments'
import DashboardSidebarMenus from './sidebar-menus'
import DashboardSidebarServices from './sidebar-services'
import DashboardSidebarUsers from './sidebar-users'

export default function DashboardSidebar() {
	const isMobile = useIsMobile()

	if (isMobile) {
		return (
			<SidebarProvider>
				<Sheet>
					<SheetTrigger asChild className='fixed bottom-5 right-5 z-50 bg-secondary size-10 p-2.5 rounded-lg shadow-lg'>
						<MenuBoard className='stroke-white size-6 ' variant='Broken' />
					</SheetTrigger>
					<SheetContent side='right' className='p-5'>
						<SheetHeader>
							<div className='flex items-center gap-2'>
								<h3 className='text-3xl font-bold leading-8 text-primary'>دنا.</h3>
								<p className='*:inline-block shrink-0'>خدمات پزشکی در منزل</p>
							</div>
						</SheetHeader>
						<SidebarMenu>
							<SidebarMenuItem>
								<Link href='/dashboard' className='flex items-center flex-1 gap-2 group *:shrink-0 '>
									<Category
										className='h-8.5 stroke-content transform group-hover:scale-110 transition-transform duration:200 p-1 rounded-lg'
										variant='Broken'
									/>
									<p className='text-lg font-bold px-2.5 pb-1 pt-1.5 rounded-lg'>داشبرد</p>
								</Link>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<DashboardSidebarArticles />
							</SidebarMenuItem>
							<SidebarMenuItem>
								<DashboardSidebarServices />
							</SidebarMenuItem>

							<SidebarMenuItem>
								<DashboardSidebarMenus />
							</SidebarMenuItem>
							<SidebarMenuItem>
								<DashboardSidebarUsers />
							</SidebarMenuItem>
							<SidebarMenuItem>
								<DashboardSidebarComments />
							</SidebarMenuItem>
						</SidebarMenu>
					</SheetContent>
				</Sheet>
			</SidebarProvider>
		)
	}
	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarHeader>
					<div className='flex items-center gap-2'>
						<h3 className='text-3xl font-bold leading-8 text-primary'>دنا.</h3>
						<p className='*:inline-block shrink-0'>خدمات پزشکی در منزل</p>
					</div>
				</SidebarHeader>
				<SidebarSeperator />
				<SidebarContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<Link href='/dashboard' className='flex items-center flex-1 gap-2 group *:shrink-0 '>
								<Category
									className='h-8.5 stroke-content transform group-hover:scale-110 transition-transform duration:200 p-1 rounded-lg'
									variant='Broken'
								/>
								<p className='text-lg font-bold px-2.5 pb-1 pt-1.5 rounded-lg'>داشبرد</p>
							</Link>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<DashboardSidebarArticles />
						</SidebarMenuItem>
						<SidebarMenuItem>
							<DashboardSidebarServices />
						</SidebarMenuItem>

						<SidebarMenuItem>
							<DashboardSidebarMenus />
						</SidebarMenuItem>
						<SidebarMenuItem>
							<DashboardSidebarUsers />
						</SidebarMenuItem>
						<SidebarMenuItem>
							<DashboardSidebarComments />
						</SidebarMenuItem>
						<SidebarMenuItem>
							<Link href='/dashboard' className='flex items-center flex-1 gap-2 group *:shrink-0 '>
								{/* eslint-disable-next-line jsx-a11y/alt-text */}
								<Image
									className='h-8.5 stroke-content transform group-hover:scale-110 transition-transform duration:200 p-1 rounded-lg'
									variant='Broken'
								/>
								<p className='text-lg font-bold px-2.5 pb-1 pt-1.5 rounded-lg'>تصاویر</p>
							</Link>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarContent>
				<SidebarSeperator />
				<SidebarFooter>
					<SidebarTrigger />
				</SidebarFooter>
			</Sidebar>
		</SidebarProvider>
	)
}
