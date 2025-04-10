import Button from '@/components/ui/button'
import { Paragraph } from '@/components/ui/typography'

export default function RequestSubmitted({ onReset }: { onReset: () => void }) {
	return (
		<div className='flex flex-col gap-10'>
			<Paragraph className='text-green-500'>درخواست با موفقیت ثبت شد.</Paragraph>
			<Button variant={'default'} onClick={onReset}>
				ثبت درخواست جدید
			</Button>
		</div>
	)
}
