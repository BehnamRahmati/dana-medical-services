import Homebanner from '@/components/home-banner'
import HomeCategories from '@/components/home-caegories'
import HomeLatestPosts from '@/components/home-latest-posts'
import HomeRequestForm from '@/components/home-request-form'
import HomeServices from '@/components/home-services'

export default function Home() {
	return (
		<>
			<Homebanner />
			<HomeRequestForm />
			<HomeCategories />
			<HomeServices />
			<HomeLatestPosts />
		</>
	)
}
