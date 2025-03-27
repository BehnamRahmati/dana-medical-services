import Homebanner from '@/components/home/home-banner'
import HomeCategories from '@/components/home/home-categories'
import HomeLatestPosts from '@/components/home/home-latest-posts'
import HomeRequestForm from '@/components/home/home-request-form'
import HomeServices from '@/components/home/home-services'

export default function Home() {
	return (
		<main>
			<Homebanner />
			<HomeCategories />
			<HomeRequestForm />
			<HomeServices />
			<HomeLatestPosts />
		</main>
	)
}
