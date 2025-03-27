import FooterTitle from './footer-title'

export default function FooterAbout() {
	return (
		<div className='flex flex-col items-start gap-5'>
			<FooterTitle>درباره دنا</FooterTitle>
			<p className='text-justify leading-7'>
				دنا مجموعه ارائه‌ دهنده خدمات سلامت در منزل و محل کار است. دنا یک «آزمایشگاه» یا «مرکز درمانی» نیست بلکه تلاش
				می‌کند تا از طریق اتصال کاربران به آزمایشگاه‌های معتبر، پرستاران کارآزموده و پزشکان متخصص، انجام خدمات سلامت در
				محل را برای کاربران تسهیل نماید.
			</p>
		</div>
	)
}
