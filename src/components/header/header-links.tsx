'use client'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Headphone } from 'iconsax-react'
import Link from 'next/link'
import HeaderButtons from './header-buttons'
import HeaderServicesLinks from './header-services-links'

const links = [
	{
		title: 'متخصصین',
		link: '/experts',
	},
	{
		title: 'رزرو خدمات',
		link: '/#request-service',
	},
	{
		title: 'مجله سلامت',
		link: '/magazine',
	},
	{
		title: 'درباره ما',
		link: '/about',
	},
	{
		title: 'ارتباط با ما',
		link: '/contact',
	},
]

export default function HeaderLinks({ setOpen }: { setOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {
	return (
		<div className='header-bottom flex-1 lg:bg-border w-full lg:w-11/12 lg:mx-auto lg:rounded-b-xl py-3 px-5'>
			<div className='flex flex-col h-full lg:flex-row justify-start lg:items-center lg:justify-between'>
				<NavigationMenu className='max-w-full lg:max-w-max *:w-full lg:*:w-fit items-start lg:items-center' dir='rtl'>
					<NavigationMenuList dir='rtl' className='flex-col lg:flex-row w-full '>
						<NavigationMenuItem asChild>
							<HeaderServicesLinks setOpen={setOpen} />
						</NavigationMenuItem>
						{links.map(link => (
							<NavigationMenuItem key={link.title} className='w-full'>
								<Link href={link.link} legacyBehavior passHref>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
										onClick={() => setOpen && setOpen(prev => !prev)}
									>
										{link.title}
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				<div className='flex flex-col items-center gap-2.5 mt-auto mb-0 lg:mt-0'>
					<Link
						href=''
						className='text-secondary border border-secondary py-1 pt-1.5 px-2.5 rounded-md flex items-center justify-center gap-2 w-full  lg:w-fit'
					>
						<Headphone className='size-5 fill-secondary mb-1' variant='Bulk' />
						<span>تماس با پشتیبانی</span>
					</Link>
					<div className='lg:hidden w-full'>
						<HeaderButtons />
					</div>
				</div>
			</div>
		</div>
	)
}
