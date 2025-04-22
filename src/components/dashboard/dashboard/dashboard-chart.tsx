'use client'
import { Bar, BarChart } from 'recharts'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'

const chartData = [
	{ month: 'January', desktop: 186, mobile: 80 },
	{ month: 'February', desktop: 305, mobile: 200 },
	{ month: 'March', desktop: 237, mobile: 120 },
	{ month: 'April', desktop: 73, mobile: 190 },
	{ month: 'May', desktop: 209, mobile: 130 },
	{ month: 'June', desktop: 214, mobile: 140 },
	{ month: 'April', desktop: 73, mobile: 190 },
	{ month: 'May', desktop: 209, mobile: 130 },
	{ month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: '#2563eb',
	},
	mobile: {
		label: 'Mobile',
		color: '#60a5fa',
	},
} satisfies ChartConfig

export default function DashboardChart() {
	return (
		<div className='rounded-lg bg-accent p-5 h-full flex flex-col flex-1 lg:max-w-1/2'>
			<div className='mb-5'>
				<h3 className='font-semibold'>چارت بازدید</h3>
				<p className='text-muted-foreground text-xs'>چارت بازدیدهای اخیر را می توانید در این بخش ببینید</p>
			</div>
			<div className='max-h-full border border-border rounded-xl '>
				<ChartContainer config={chartConfig} className='min-h-[200px] h-[280px] w-full'>
					<BarChart accessibilityLayer data={chartData}>
						<Bar dataKey='desktop' className='fill-content' radius={4} />
						<Bar dataKey='mobile' className='fill-content/70' radius={4} />
					</BarChart>
				</ChartContainer>
			</div>
		</div>
	)
}
