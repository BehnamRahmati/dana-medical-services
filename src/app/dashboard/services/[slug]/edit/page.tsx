import ServiceEditForm from '@/components/dashboard/services/service-edit'
import { TServices } from '@/lib/types'
import axios from 'axios'

async function getService(url: string): Promise<TServices> {
	const response = await axios.get(url)
	return await response.data.service
}

export default async function EditService({ params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug
	const service = await getService(`http://localhost:3000/api/dashboard/services/${slug}`)

	return (
		<div>
			<ServiceEditForm service={service} />
		</div>
	)
}
