import ServiceEditForm from '@/components/dashboard/services/edit-form/service-edit'
import { TService } from '@/lib/types'
import axios from 'axios'

async function getService(url: string): Promise<TService> {
	const response = await axios.get(url)
	return await response.data.service
}

export default async function EditService({ params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug
	const service = await getService(`http://localhost:3000/api/dashboard/services/${slug}`)

	return <ServiceEditForm service={service} />
}
