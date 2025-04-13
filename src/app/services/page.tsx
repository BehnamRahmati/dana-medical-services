import ServicesHeader from '@/components/services/services-header'
import ServicesMain from '@/components/services/services-main'
import ServicesProvider from '@/components/services/services-provider'

export default function ServicesPage() {
	return (
		<ServicesProvider>
			<div className='px-0 lg:px-10 2xl:px-24 mt-10 lg:mt-20 container mx-auto'>
				<ServicesHeader />
				<ServicesMain />
			</div>
		</ServicesProvider>
	)
}
