import { Instagram, Send2, Whatsapp, Youtube } from 'iconsax-react'
import Link from 'next/link'
import Logo from '../logo'

export default function FooterHeader() {
	return (
		<div className='container mx-auto my-10 flex items-center justify-between'>
			<Logo />
			<ul className='flex flex-row items-center gap-5 text-2xl text-primary *:bg-primary/10 *:p-1 *:rounded-lg'>
				<li>
					<Link href='/'>
						<Whatsapp size='25' className='fill-primary' variant='Bulk' />
					</Link>
				</li>
				<li>
					<Link href='/'>
						<Instagram size='25' className='fill-primary' variant='Bulk' />
					</Link>
				</li>
				<li>
					<Link href='/'>
						<Send2 size='25' className='fill-primary' variant='Bulk' />
					</Link>
				</li>
				<li>
					<Link href='/'>
						<Youtube size='25' className='fill-primary' variant='Bulk' />
					</Link>
				</li>
			</ul>
		</div>
	)
}
