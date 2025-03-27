import FooterTitle from './footer-title'

export default function FooterTopServices() {
	return (
		<div className='flex flex-col items-start gap-5'>
			<FooterTitle>برخی از خدمات دنا</FooterTitle>
			<ul className='flex flex-col gap-2.5'>
				<li>تست کرونا در منزل</li>
				<li>تفسیر نتایج آزمایش</li>
				<li>خدمات فیزیوتراپی در منزل</li>
				<li> خدمات پرستاری در منزل</li>
				<li>ویزیت پزشک عمومی در منزل</li>
				<li>خدمات رادیولوژی در منزل</li>
			</ul>
		</div>
	)
}
