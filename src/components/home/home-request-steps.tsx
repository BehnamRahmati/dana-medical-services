import Section from '../ui/section'
import Title from '../ui/title'
import { H3, Paragraph } from '../ui/typography'
import ListBullet from './list-bullet'

export default function HomeRequestSteps() {
	return (
		<Section>
			<div className='pt-40 pb-0'>
				<div className='mx-auto w-fit px-5'>
					<Title>مراحل ثبت درخواست</Title>
				</div>
				<div className='max-w-lg mx-auto mt-32 '>
					<ul className='flex flex-col gap-20 pl-5 lg:pr-5 *:pr-20 *:relative'>
						<li>
							<ListBullet step={0} />
							<H3>ثبت درخواست</H3>
							<Paragraph>در ابتدا درخواست خود را از طریق فرم یا تماس تلفنی ثبت می‌کنید.</Paragraph>
						</li>
						<li>
							<ListBullet step={1} />
							<H3>هماهنگی زمان مراجعه</H3>
							<Paragraph>کارشناسان ما با شما تماس گرفته و پس از هماهنگی درخواست شما نهایی می‌شود.</Paragraph>
						</li>
						<li>
							<ListBullet step={2} />
							<H3>اعزام همکاران ما</H3>
							<Paragraph>نیروی متخصص به منزل یا محل کار شما اعزام شده و اقدامات لازم را انجام می‌دهد.</Paragraph>
						</li>
						<li>
							<ListBullet step={3} />
							<H3>دریافت نتایج آزمایش</H3>
							<Paragraph>در صورت وجود آزمایش نتیجه از طریق کارشناسان ما خدمت شما ارسال میشود.</Paragraph>
						</li>
					</ul>
				</div>
			</div>
		</Section>
	)
}
