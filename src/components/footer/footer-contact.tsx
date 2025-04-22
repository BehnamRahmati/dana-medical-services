import enamad from '@/assets/enamad.png'
import samandehi from '@/assets/samandehi.png'
import Image from 'next/image'
import Link from 'next/link'
import FooterTitle from './footer-title'
export default function FooterContact() {
	return (
		<div className='flex flex-col items-start gap-5'>
			<FooterTitle>مجوز های دنا</FooterTitle>
			<div className='w-full'>
				<div className='flex items-center justify-between'>
					<p>ایمیل:</p>
					<Link href='/' dir='ltr'>
						info@dana.clinic
					</Link>
				</div>
				<div className='flex items-center justify-between mt-5'>
					<p>ای دی تلگرام:</p>
					<Link href='/' dir='ltr'>
						@dena_medical
					</Link>
				</div>
			</div>

			<div className='flex flex-row items-center mt-5'>
				<Link href='/'>
					<Image src={samandehi} alt='samandehi' width={150} height={150} className='h-32 w-24' />
				</Link>
				<Link href='/'>
					<Image src={enamad} alt='samandehi' width={150} height={150} className='h-32 w-28' />
				</Link>
			</div>
		</div>
	)
}
