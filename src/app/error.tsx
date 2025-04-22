'use client'
import Button from '@/components/ui/button'
import Section from '@/components/ui/section'
import { EmojiSad } from 'iconsax-react'
import { useEffect } from 'react'

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error(error)
	}, [error])
	return (
		<main>
			<Section>
				<div className='py-20 px-2.5 lg:px-5 flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-20'>
					<div className='flex flex-col'>
						<h1 className='text-7xl font-black'>خطای 500!</h1>
						<p className='text-2xl text-center font-light text-content/50 mt-5'>
							مشکلی در بارگذاری صفحه رخ داده است.
						</p>
						<Button variant={'outline'} onClick={() => reset()} className='w-fit mt-5 mx-auto'>
							تلاش مجدد
						</Button>
					</div>
					<EmojiSad className='stroke-content size-56' variant='Broken' />
				</div>
			</Section>
		</main>
	)
}
