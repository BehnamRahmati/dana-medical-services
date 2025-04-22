'use client'

import { useRouter } from 'next/navigation'
import Button from './ui/button'

export default function PreviousPageButton() {
	const router = useRouter()
	return (
		<Button variant={'outline'} onClick={() => router.back()} className='w-fit mt-5'>
			بازگشت به صفحه قبل
		</Button>
	)
}
