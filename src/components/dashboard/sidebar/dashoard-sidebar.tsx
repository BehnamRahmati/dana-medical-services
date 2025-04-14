'use client'
import HeaderButtons from '@/components/header/header-buttons'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
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
import { DocumentText, FavoriteChart, Image, MenuBoard } from 'iconsax-react'
import Link from 'next/link'
import React from 'react'
import DashboardSidebarArticles from './sidebar-articles'
import DashboardSidebarComments from './sidebar-comments'
import DashboardSidebarMenus from './sidebar-menus'
import DashboardSidebarServices from './sidebar-services'
import DashboardSidebarUsers from './sidebar-users'

export default function DashboardSidebar() {
	const isMobile = useIsMobile()
	const [open, setOpen] = React.useState(false)
	if (isMobile) {
		return (
			<SidebarProvider>
				<div className='lg:hidden'>
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger
							asChild
							className='fixed bottom-5 right-5 z-50 bg-secondary/20 border border-secondary size-10 p-2.5 rounded-lg shadow-lg'
						>
							<MenuBoard className='stroke-secondary size-6 ' variant='Broken' />
						</SheetTrigger>
						<SheetContent side='right' className='p-5 border-0!'>
							<SheetHeader>
								<SheetTitle asChild>
									<div className='flex items-center gap-2'>
										<h3 className='text-3xl font-bold leading-8 text-primary'>دنا.</h3>
										<p className='*:inline-block shrink-0'>خدمات پزشکی در منزل</p>
									</div>
								</SheetTitle>
							</SheetHeader>
							<SidebarMenu>
								<SidebarMenuItem>
									<Link
										href='/dashboard'
										onClick={() => setOpen(prev => !prev)}
										className='flex items-center flex-1 gap-2 group *:shrink-0 '
									>
										<FavoriteChart
											className='h-8.5 stroke-content transform group-hover:scale-110 transition-transform duration:200 p-1 rounded-lg'
											variant='Broken'
										/>
										<p className='text-lg font-bold px-2.5 pb-1 pt-1.5 rounded-lg'>داشبرد</p>
									</Link>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<DashboardSidebarArticles setOpen={setOpen} />
								</SidebarMenuItem>
								<SidebarMenuItem>
									<DashboardSidebarServices setOpen={setOpen} />
								</SidebarMenuItem>
								<SidebarMenuItem>
									<DashboardSidebarMenus setOpen={setOpen} />
								</SidebarMenuItem>
								<SidebarMenuItem>
									<DashboardSidebarUsers setOpen={setOpen} />
								</SidebarMenuItem>
								<SidebarMenuItem>
									<DashboardSidebarComments setOpen={setOpen} />
								</SidebarMenuItem>
								<SidebarMenuItem>
									<Link
										href='/dashboard'
										onClick={() => setOpen(prev => !prev)}
										className='flex items-center flex-1 gap-2 group *:shrink-0 '
									>
										{/* eslint-disable-next-line jsx-a11y/alt-text */}
										<Image
											className='h-8.5 stroke-content transform group-hover:scale-110 transition-transform duration:200 p-1 rounded-lg'
											variant='Broken'
										/>
										<p className='text-lg font-bold px-2.5 pb-1 pt-1.5 rounded-lg'>تصاویر</p>
									</Link>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<Link
										href='/dashboard/requests'
										onClick={() => setOpen(prev => !prev)}
										className='flex items-center flex-1 gap-2 group *:shrink-0 '
									>
										<DocumentText
											className='h-8.5 stroke-content transform group-hover:scale-110 transition-transform duration:200 p-1 rounded-lg'
											variant='Broken'
										/>
										<p className='text-lg font-bold px-2.5 pb-1 pt-1.5 rounded-lg'>درخواست ها</p>
									</Link>
								</SidebarMenuItem>
							</SidebarMenu>
							<SheetFooter className='p-0'>
								<div className='flex flex-col items-center gap-2.5 mt-auto mb-0 lg:mt-0'>
									<div className='lg:hidden w-full'>
										<HeaderButtons />
									</div>
								</div>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</SidebarProvider>
		)
	}
	return (
		<SidebarProvider>
			<div className='hidden lg:block'>
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
									<FavoriteChart
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
							<SidebarMenuItem>
								<Link href='/dashboard/requests' className='flex items-center flex-1 gap-2 group *:shrink-0 '>
									<DocumentText
										className='h-8.5 stroke-content transform group-hover:scale-110 transition-transform duration:200 p-1 rounded-lg'
										variant='Broken'
									/>
									<p className='text-lg font-bold px-2.5 pb-1 pt-1.5 rounded-lg'>درخواست ها</p>
								</Link>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarContent>
					<SidebarSeperator />
					<SidebarFooter>
						<SidebarTrigger />
					</SidebarFooter>
				</Sidebar>
			</div>
		</SidebarProvider>
	)
}
