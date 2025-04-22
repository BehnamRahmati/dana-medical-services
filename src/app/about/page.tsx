import enamad from '@/assets/enamad.png'
import samandehi from '@/assets/samandehi.png'
import Section from '@/components/ui/section'
import Title from '@/components/ui/title'
import { H1, H4, Paragraph } from '@/components/ui/typography'
import { BoxTime, EmptyWallet, I24Support, MoneyRecive } from 'iconsax-react'
import Image from 'next/image'
export default function AboutPage() {
	const values = [
		{
			title: 'هزینه در محل',
			description: 'نمونه‌گیری در محل فقط با ۲۹۰ هزار تومان',
			icon: <MoneyRecive className='stroke-secondary size-24' variant='Broken' />,
		},
		{
			title: 'پوشش بیمه در لحظه',
			description: 'خدمات آزمایشگاهی تحت پوشش تمام بیمه‌های پایه و تکمیلی',
			icon: <EmptyWallet className='stroke-secondary size-24' variant='Broken' />,
		},
		{
			title: 'سرعت',
			description: 'انجام آزمایش‌هایی که نیاز به جواب اورژنسی دارند',
			icon: <I24Support className='stroke-secondary size-24' variant='Broken' />,
		},
		{
			title: 'کیفیت ارسال',
			description: 'رعایت زنجیره سرد در ارسال نمونه‌ها به آزمایشگاه',
			icon: <BoxTime className='stroke-secondary size-24' variant='Broken' />,
		},
	]

	const permissions = [
		{
			title: 'نماد اعتماد الکترونیکی',
			description:
				'یكی از عوامل مهم توسعه تجارت الكترونیكی، ایجاد اعتماد و اطمینان در میان كاربران خدمات الكترونیكی است. در ایران مركز توسعه تجارت الكترونیكی مسئولیت ایجاد زیر ساخت های امنیت و اعطای نماد اعتماد الكترونیكی به کسب و کارهای اینترنتی را برعهده دارد. مرکز توسعه تجارت الکترونیکی، با اعطای نماد اعتماد الکترونیکی هویت صاحب و محل فعالیت کسب و کارهای اینترنتی را احراز می‌نماید. دارنده نماد اعتماد الکترونیکی، تحت نظارت دستگاه های مسئول، ملزم به رعایت قوانین و مقررات مندرج در تعهدنامه نماد است.',
			src: enamad,
		},
		{
			title: 'مجوز کشوری کسب‌و‌کارهای مجازی',
			description:
				'در کسب و کارهای اینترنتی برای قانونمند کردن فعالیت سایت استارتاپ‌ها، از طرف اتحادیه کشوری کسب و کارهای مجازی جواز صادر می‌گردد و این شناسنامه در محاکم قضائی و نهادهای دولتی به عنوان یک کسب و کار قانونمند و در راستای قانون جمهوری اسلامی ایران شناخته می‌شود.',
			src: samandehi,
		},
	]

	return (
		<div>
			<Section>
				<div className='flex flex-col lg:flex-row items-center gap-5 lg:gap-20 w-2/3 mx-auto lg:px-5 py-10 lg:py-20'>
					<div className='lg:w-1/2 inline-block'>
						<H1 className='text-6xl lg:text-7xl text-primary text-center lg:text-right'>
							درباره مرکز خدمات پزشکی دنا
						</H1>
					</div>
					<div className='lg:w-1/2 inline-block'>
						<Paragraph className='text-center lg:text-right'>
							دنا مجموعه ارائه‌ دهنده خدمات سلامت در منزل و محل کار است. دنا یک «آزمایشگاه» یا «مرکز درمانی» نیست
							بلکه تلاش می‌کند تا از طریق اتصال کاربران به آزمایشگاه‌های معتبر، پرستاران کارآزموده و پزشکان متخصص،
							انجام خدمات سلامت در محل را برای کاربران تسهیل نماید.
						</Paragraph>
					</div>
				</div>
			</Section>
			<Section>
				<div className='px-2.5 lg:px-5 py-10 lg:py-20'>
					<Title>ارزش های کلینیک دنا</Title>
					<ul className='grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-20 mt-10 lg:mt-20 lg:w-2/3 mx-auto '>
						{values.map(value => (
							<li key={value.title} className='bg-secondary/10 p-10 rounded-4xl *:text-secondary'>
								<div className='mx-auto w-fit'>{value.icon}</div>
								<H4 className='text-center mt-5'>{value.title}</H4>
								<Paragraph className='text-center mt-2 '>{value.description}</Paragraph>
							</li>
						))}
					</ul>
				</div>
			</Section>
			<Section>
				<div className='px-2.5 lg:px-5 py-10 lg:py-20'>
					<Title>مجوز های کلینیک دنا</Title>
					<ul className='grid grid-cols-1 gap-5 lg:gap-20 mt-10 lg:mt-20 lg:w-2/3 mx-auto'>
						{permissions.map(permit => (
							<li
								key={permit.title}
								className='bg-secondary/10 p-10 rounded-4xl *:text-secondary flex flex-col lg:flex-row items-center lg:even:flex-row-reverse'
							>
								<div className='mx-auto w-44 shrink-0'>
									<Image src={permit.src} alt={permit.title} width={300} height={300} className='w-full' />
								</div>
								<div className='flex-1'>
									<H4 className='text-center lg:text-right mt-5'>{permit.title}</H4>
									<Paragraph className='text-center lg:text-right mt-2 '>{permit.description}</Paragraph>
								</div>
							</li>
						))}
					</ul>
				</div>
			</Section>
			{/* <Section>
				<div className='px-2.5 lg:px-5 py-10 lg:py-20'>
					<Title>آدرس کلینیک دنا</Title>
					<div className='mt-10 flex flex-col lg:flex-row gap-10 items-center'>
						<div className='flex-1'></div>
						<div className='flex-1'>
							<MapComponent />
						</div>
					</div>
				</div>
			</Section> */}
		</div>
	)
}
