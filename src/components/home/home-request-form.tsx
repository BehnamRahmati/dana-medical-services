'use client'
import { useState } from 'react'
import { z } from 'zod'
import { Progress } from '../ui/progress'
import Section from '../ui/section'
import { H2, H3, Paragraph } from '../ui/typography'
import RequestInfoForm, { infoSchema } from './request/request-info-form'
import RequestServiceForm, { serviceSchema } from './request/request-service-form'
import RequestSubmitted from './request/request-submited'
import RequestTimeForm, { timeSchema } from './request/request-time-form'

type timetype = z.infer<typeof timeSchema>
type servicetype = z.infer<typeof serviceSchema>
type infotype = z.infer<typeof infoSchema>

export default function HomeRequestForm() {
	const [progress, setProgress] = useState(1)
	const [formData, setFormData] = useState<Partial<timetype & servicetype & infotype>>({})

	const handleBack = () => {
		setProgress(prev => prev - 1)
	}
	const handleForward = () => {
		setProgress(prev => prev + 1)
	}

	const handleTimeSubmit = (data: timetype) => {
		setFormData(prevData => ({ ...prevData, ...data }))
		handleForward()
	}
	const handleServiceSubmit = (data: servicetype) => {
		setFormData(prevData => ({ ...prevData, ...data }))
		handleForward()
	}
	const handleInfoSubmit = (data: infotype) => {
		const finalForm = { ...formData, ...data }
		handleForward()
		console.warn('Final Form Data:', finalForm)
	}

	const renderingForms = (step: number) => {
		switch (step) {
			case 2:
				return <RequestTimeForm onBack={handleBack} onSubmit={handleTimeSubmit} />
			case 3:
				return <RequestInfoForm onBack={handleBack} onSubmit={handleInfoSubmit} />
			case 4:
				return <RequestSubmitted onReset={() => setProgress(1)} />
			default:
				return <RequestServiceForm onSubmit={handleServiceSubmit} />
		}
	}

	const renderingProgress = (step: number) => {
		return (
			<div className='flex items-center gap-2 mt-5 *:flex-1'>
				<div className=''>
					<Paragraph>1. ثبت سرویس</Paragraph>
					<Progress value={step > 1 ? 100 : 0} />
				</div>
				<div className=''>
					<Paragraph>2. ثبت تاریخ</Paragraph>
					<Progress value={step > 2 ? 100 : 0} />
				</div>
				<div className=''>
					<Paragraph>3. اطلاعات بیمار</Paragraph>
					<Progress value={step > 3 ? 100 : 0} />
				</div>
			</div>
		)
	}

	return (
		<Section className='bg-primary px-5 lg:px-0' id='request-service'>
			<div className='flex flex-col lg:flex-row gap-10 py-10 lg:py-0 lg:px-20 relative'>
				<div className='*:text-white max-w-lg text-center lg:text-right'>
					<H2>ثبت درخواست خدمات</H2>
					<Paragraph>
						دنا مجموعه ارائه‌ دهنده خدمات سلامت در منزل و محل کار است. دنا یک «آزمایشگاه» یا «مرکز درمانی» نیست بلکه
						تلاش می‌کند تا از طریق اتصال کاربران به آزمایشگاه‌های معتبر، پرستاران کارآزموده و پزشکان متخصص، انجام
						خدمات سلامت در محل را برای کاربران تسهیل نماید.
					</Paragraph>
				</div>
				<div className='lg:w-lg mx-auto bg-accent border border-border rounded-lg p-10 shadow-md lg:absolute left-20 top-1/2 lg:transform lg:-translate-y-1/2'>
					<div className='mb-10'>
						<H3 className=' w-fit mx-auto'>فرم درخواست خدمات</H3>
						<Paragraph className='text-center '>
							با پرکردن فرم زیر درخواست خود را برای دریافت خدمات ثبت کنید.
						</Paragraph>
					</div>
					<div className=''>{renderingForms(progress)}</div>

					<div className=''>{renderingProgress(progress)}</div>
				</div>
			</div>
		</Section>
	)
}
