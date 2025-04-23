import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { handleToastPromise } from '@/lib/helpers'
import { ArrowSquareUp } from 'iconsax-react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useSWRConfig } from 'swr'

export default function UserAction({ id }: { id: string }) {
	const { data: session, status } = useSession()
	const { mutate } = useSWRConfig()
	const hadlePromotion = async (role: string) => {
		if (session?.user.role !== 'SUPERADMIN') {
			toast.error('صلاحیت این عمل را ندارید.')
			return
		}
		const submitPromise = fetch(`/api/dashboard/users/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ role }),
		})
		handleToastPromise(
			() => submitPromise,
			'در حال انجام درخواست',
			'درخواست با موفقیت انجام شد',
			'خطا در انجام درخواست',
			() => mutate(['/api/dashboard/users', 'du-users']),
		)
	}
	if (status === 'loading') return <div className=''>loading</div>
	if (status === 'unauthenticated' || !session) return <div className=''></div>

	return (
		<>
			<DropdownMenuItem>
				<button
					className='flex items-center gap-2 cursor-pointer'
					onClick={async () => {
						await hadlePromotion('ADMIN')
					}}
				>
					<ArrowSquareUp className='stroke-content size-4 shrink-0' />
					<span>ارتقا به ادمین</span>
				</button>
			</DropdownMenuItem>
			<DropdownMenuItem>
				<button
					onClick={async () => {
						await hadlePromotion('EXPERT')
					}}
					className='flex items-center gap-2 cursor-pointer'
				>
					<ArrowSquareUp className='stroke-content size-4 shrink-0' />
					<span>ارتقا به متخصص</span>
				</button>
			</DropdownMenuItem>
			<DropdownMenuItem>
				<button
					onClick={async () => {
						await hadlePromotion('USER')
					}}
					className='flex items-center gap-2 cursor-pointer'
				>
					<ArrowSquareUp className='stroke-content size-4 shrink-0' />
					<span>نزول به کاربر</span>
				</button>
			</DropdownMenuItem>
		</>
	)
}
