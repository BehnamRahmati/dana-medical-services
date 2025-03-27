import FooterTitle from './footer-title'

export default function FooterQuickAccess() {
	return (
		<div className='flex flex-col items-start gap-5'>
			<FooterTitle>دسترسی سریع</FooterTitle>
			<ul className='flex flex-col gap-2.5'>
				<li>خانه</li>
				<li>درباره ما</li>
				<li>تماس با ما</li>
				<li>پنل همکاران</li>
				<li>مقالات</li>
				<li>مجله سلامت</li>
			</ul>
		</div>
	)
}
