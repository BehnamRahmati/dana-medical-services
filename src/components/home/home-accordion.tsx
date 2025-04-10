import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Section from '../ui/section'
import Title from '../ui/title'
export default function HomeAccordion() {
	return (
		<Section>
			<div className='lg:max-w-xl xl:max-w-3xl px-5 py-5 lg:px-20 mx-auto'>
				<div className='mx-auto w-fit'>
					<Title> پرسش های متداول </Title>
				</div>

				<Accordion
					type='single'
					defaultValue='item-1'
					collapsible
					className='w-full mt-20 bg-accent rounded-xl border-border border p-5'
				>
					<AccordionItem value='item-1'>
						<AccordionTrigger>
							<span>مرکز مشاوره مجوز دارد؟</span>
						</AccordionTrigger>
						<AccordionContent>بله مرکز دنا مجوز رسمی از دانشگاه علوم پزشکی ایران را دارد.</AccordionContent>
					</AccordionItem>
					<AccordionItem value='item-2'>
						<AccordionTrigger>چه مناطقی خدمات دهی دارید؟</AccordionTrigger>
						<AccordionContent>کلیه مناطق 22گانه شهر تهران تحت پوشش مرکز دنا می باشد.</AccordionContent>
					</AccordionItem>
					<AccordionItem value='item-3'>
						<AccordionTrigger>ساعت پاسخگویی مرکز دنا به چه صورت است؟</AccordionTrigger>
						<AccordionContent>
							ساعت پاسخگویی مرکز دنا همه روزه کل ایام هفته حتی روزهای تعطیل از ساعت 9 صبح تا 8 شب می باشد.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</Section>
	)
}
