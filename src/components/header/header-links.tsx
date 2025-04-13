import { Headphone } from 'iconsax-react'
import Link from 'next/link'
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
		title: 'مقالات',
		link: '/articles',
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
		<div className='header-bottom lg:bg-border w-full lg:w-11/12 lg:mx-auto lg:rounded-b-xl py-3 px-5'>
			<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
				<nav>
					<ul className='flex flex-col lg:flex-row lg:items-center gap-5'>
						<HeaderServicesLinks setOpen={setOpen} />
						{links.map(link => (
							<li key={link.title}>
								<Link href={link.link} onClick={() => setOpen && setOpen(prev => !prev)}>
									{link.title}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<Link
					href=''
					className='text-secondary border border-secondary py-1 pt-1.5 px-2.5 rounded-md flex items-center gap-2 mt-5 lg:mt-0 w-fit'
				>
					<Headphone className='size-5 fill-secondary mb-1' variant='Bulk' />
					<span>تماس با پشتیبانی</span>
				</Link>
			</div>
		</div>
	)
}
