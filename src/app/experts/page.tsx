import bg from '@/assets/experts-background.jpg'
import ExpertsList from '@/components/experts/experts-list'
import { H2, H3, Paragraph } from '@/components/ui/typography'
export default function ExpertsPage() {
	return (
		<div>
			<div
				className='w-full h-[70vh] lg:h-[100vh] bg-slate-700 bg-blend-overlay -mt-32 lg:-mt-52 rounded-b-[3rem] lg:rounded-b-[10rem] flex items-center justify-center'
				style={{ backgroundImage: `url(${bg.src})`, backgroundSize: 'cover' }}
			>
				<div className='*:text-center px-10 pt-24 lg:pt-0'>
					<H2 className='lg:text-8xl text-5xl font-bold text-white'>متخصصان دنا</H2>
					<Paragraph className='lg:text-4xl text-white'>
						در این صفحه لیست متخصصانی که در دنا فعالیت دارند، قرار داده شده است.
					</Paragraph>
				</div>
			</div>
			<div className='container mx-auto bg-muted w-11/12 rounded-4xl -mt-24 lg:-mt-44 border bordr-border shadow-lg p-5 lg:p-16'>
				<div className='mb-10 lg:mb-20'>
					<H3>آشنایی با متخصصان دنا</H3>
					<Paragraph>
						یادگیری هر مهارتی از طریق فرد مختصص، موضوع مهمی است که هر شخص یادگیرنده‌ای باید به آن توجه داشته باشد، ما
						در راکت تمام سعی خود را کرده‌ایم تا افراد مختصص در حوزه‌های مختلف را در کنار هم جمع کنیم تا بتوانیم برای
						شما دانشجوهای عزیز، محتوای با کیفیت فراهم کنیم. بهترین کیفیت حق شماست و ما در تیم راکت تلاش داریم تا این
						کیفیت را به شما ارائه دهیم.
					</Paragraph>
					<Paragraph>
						مدرسان پذیرفته شده در راکت با توجه به معیارهایی نظیر تعداد ساعت‌های آموزشی، تعداد برگزاری دوره، فعالیت های
						حرفه ای آموزشی و … انتخاب می‌شوند. در واقع ما هر مدرسی را انتخاب نمی‌کنیم و بابت پذیرفته‌شدن هر فرد احساس
						مسئولیت زیادی داریم و زمان زیادی را صرف بررسی شخص می‌کنیم و سپس از فرد مورد نظر دعوت به همکاری در مجموعه‌
						مینماییم.
					</Paragraph>
				</div>
				<ExpertsList />
			</div>
		</div>
	)
}
