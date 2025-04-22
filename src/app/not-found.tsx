import PreviousPageButton from '@/components/previous-page-button'
import Section from '@/components/ui/section'
import { EmojiSad } from 'iconsax-react'

export default function NotFoundPage() {
	return (
		<main>
			<Section>
				<div className='py-20 px-2.5 lg:px-5 flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-20'>
					<div className='flex flex-col'>
						<h1 className='text-7xl font-black'>خطای 404!</h1>
						<p className='text-2xl text-center font-light text-content/50 mt-5'>صفحه مورد نظر شما پیدا نشد!</p>
						<div className='mx-auto'>
							<PreviousPageButton />
						</div>
					</div>
					<EmojiSad className='stroke-content size-56' variant='Broken' />
				</div>
			</Section>
		</main>
	)
}
