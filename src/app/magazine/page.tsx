import MagazineBanner from '@/components/magazine/magazine-banner'
import dynamic from 'next/dynamic'
const MagazineCategoriseSection = dynamic(() => import('@/components/magazine/magazine-categories-section'))
const MagazineSection = dynamic(() => import('@/components/magazine/magazine-section'))
export default function MagazinePage() {
	return (
		<main>
			<MagazineBanner />
			<MagazineCategoriseSection />
			<MagazineSection categorySlug='general-health' title='سلامت عمومی' />
			<MagazineSection categorySlug='mental-health' title='سلامت روان' />
			<MagazineSection categorySlug='healthy-diet' title='تغذیه سالم' />
		</main>
	)
}
