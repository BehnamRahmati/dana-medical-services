import ServicesMain from '@/components/services/services-main'
import ServicesProvider from '@/components/services/services-provider'
import ServicesSidebar from '@/components/services/services-sidebar'

export default function ServicesPage() {
	return (
		<ServicesProvider>
			<div className='flex flex-col lg:flex-row gap-0 lg:gap-5 mt-10 lg:mt-20 container mx-auto'>
				<ServicesSidebar />
				<ServicesMain />
			</div>
		</ServicesProvider>
	)
}
