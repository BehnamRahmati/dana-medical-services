import HomeArticles from '@/components/home/articles/home-articles'
import HomeCategories from '@/components/home/categories/home-categories'
import HomeAccordion from '@/components/home/home-accordion'
import Homebanner from '@/components/home/home-banner'
import HomeRequestForm from '@/components/home/home-request-form'
import HomeRequestSteps from '@/components/home/home-request-steps'
import HomeServices from '@/components/home/services/home-services'

export default function Home() {
	return (
		<main>
			<Homebanner />
			<HomeCategories />
			<HomeRequestForm />
			<HomeRequestSteps />
			<HomeServices />
			<HomeAccordion />
			<HomeArticles />
		</main>
	)
}
