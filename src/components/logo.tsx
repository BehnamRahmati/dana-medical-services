import Link from 'next/link'

export default function Logo() {
	return (
		<Link href='/' className='flex flex-col items-center gap-1'>
			<span className='text-xs font-light hidden lg:block'>خدمات پزشکی</span>
			<span className='text-5xl font-extrabold text-primary leading-8'>دنــا</span>
		</Link>
	)
}
