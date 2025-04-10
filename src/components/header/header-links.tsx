import { Headphone } from 'iconsax-react'
import Link from 'next/link'
import HeaderServicesLinks from './header-services-links'

export default function HeaderLinks() {
	return (
		<div className='header-bottom bg-border w-11/12 mx-auto rounded-b-xl py-3 px-5'>
			<div className='flex flex-row items-center justify-between '>
				<nav>
					<ul className='flex items-center gap-5'>
						<HeaderServicesLinks />
						<li>متخصصین</li>
						<li>
							<Link href='/#request-service'>رزرو خدمات</Link>
						</li>
						<li>
							<Link href='/articles'>مقالات</Link>
						</li>
						<li>
							<Link href='/about'>درباره ما</Link>
						</li>
						<li>
							<Link href='/contact'>ارتباط با ما</Link>
						</li>
					</ul>
				</nav>
				<Link
					href=''
					className='text-secondary border border-secondary py-1 pt-1.5 px-2.5 rounded-md flex items-center gap-2'
				>
					<Headphone className='size-5 fill-secondary mb-1' variant='Bulk' />
					<span>تماس با پشتیبانی</span>
				</Link>
			</div>
		</div>
	)
}
