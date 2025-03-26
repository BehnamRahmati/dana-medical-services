import Logo from './logo'

function Footer() {
	return (
		<footer className='bg-accent'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 py-10 container mx-auto'>
				<div className='flex flex-col items-start gap-5'>
					<Logo />
					<p className='text-justify'>
						دنا مجموعه ارائه‌ دهنده خدمات سلامت در منزل و محل کار است. دنا یک «آزمایشگاه» یا «مرکز درمانی» نیست بلکه
						تلاش می‌کند تا از طریق اتصال کاربران به آزمایشگاه‌های معتبر، پرستاران کارآزموده و پزشکان متخصص، انجام
						خدمات سلامت در محل را برای کاربران تسهیل نماید.
					</p>
				</div>

				<div className='flex flex-col items-start gap-5'>
					<h3 className='text-lg font-bold'>دسترسی سریع</h3>
					<ul className='flex flex-col gap-2.5'>
						<li>خانه</li>
						<li>درباره ما</li>
						<li>تماس با ما</li>
						<li>پنل همکاران</li>
						<li>مقالات</li>
						<li>مجله سلامت</li>
					</ul>
				</div>

				<div className='flex flex-col items-start gap-5'>
					<h3 className='text-lg font-bold'> برخی از خدمات دنا</h3>
					<ul className='flex flex-col gap-2.5'>
						<li>خانه</li>
						<li>درباره ما</li>
						<li>تماس با ما</li>
						<li>پنل همکاران</li>
						<li>مقالات</li>
						<li>مجله سلامت</li>
					</ul>
				</div>

				<div className='flex flex-col items-start gap-5'>
					<h3 className='text-lg font-bold'> مجوز های دنا</h3>
					<ul className='flex flex-col gap-2.5'>
						<li>خانه</li>
						<li>درباره ما</li>
						<li>تماس با ما</li>
						<li>پنل همکاران</li>
						<li>مقالات</li>
						<li>مجله سلامت</li>
					</ul>
				</div>
			</div>
			<p className='text-center py-5 border-t border-t-foreground'>تمام حقوق مادی و معنوی این وبسایت متعلق به دنا است.</p>
		</footer>
	)
}

export default Footer
