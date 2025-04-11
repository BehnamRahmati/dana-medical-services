import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import { HambergerMenu } from 'iconsax-react'
import { useState } from 'react'
import Logo from '../logo'
import HeaderLinks from './header-links'

export default function HeaderResponsive() {
	const [open, setOpen] = useState(false)
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<header>
				<div className='container mx-auto'>
					<div className='flex flex-col px-2.5 lg:px-5'>
						<div className='header-top bg-accent rounded-xl mt-2.5 p-4 lg:p-9.5 shadow-xs w-full flex flex-row items-center justify-between'>
							<SheetTrigger>
								<HambergerMenu className='size-10 stroke-primary' variant='Broken' />
							</SheetTrigger>
							<Logo />
						</div>
						<SheetContent>
							<SheetHeader>
								<SheetTitle className='text-primary text-xl'>خدمات پزشکی دنا</SheetTitle>
							</SheetHeader>
							<HeaderLinks setOpen={setOpen} />
						</SheetContent>
					</div>
				</div>
			</header>
		</Sheet>
	)
}
