import { fetchLastFourArticle } from '@/lib/backend.helpers'
import { TArticle } from '@/lib/types'
import dynamic from 'next/dynamic'
const MagazineCategoriseSection = dynamic(() => import('@/components/magazine/magazine-categories-section'))
const MagazineSection = dynamic(() => import('@/components/magazine/magazine-section'))
const MagazineBanner = dynamic(() => import('@/components/magazine/magazine-banner'))

export default async function MagazinePage() {
	const articles = (await fetchLastFourArticle()) as TArticle[]

	return (
		<main>
			<MagazineBanner articles={articles} />
			<MagazineCategoriseSection />
			<MagazineSection categorySlug='general-health' title='سلامت عمومی' />
			<MagazineSection categorySlug='mental-health' title='سلامت روان' />
			<MagazineSection categorySlug='healthy-diet' title='تغذیه سالم' />
		</main>
	)
}
