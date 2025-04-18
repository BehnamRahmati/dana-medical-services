import Link from 'next/link'

export default function PostSidebarRelatedCard({ title, slug }: { title: string; slug: string }) {
	return (
		<div className='bg-accent rounded-md py-5'>
			<Link
				href={`/articles/${slug}`}
				className='px-5 block text-sm font-bold relative before:content-[""] before:block before:bg-primary before:w-1 before:rounded-l-lg before:h-full before:border before:border-primary before:absolute before:right-0 before:top-0'
			>
				{title}
			</Link>
		</div>
	)
}
