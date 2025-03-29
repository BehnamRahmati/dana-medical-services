import AuthenticationPage from '@/components/authentication-page'

export default function Register() {
	return (
		<main>
			<AuthenticationPage title='ثبت نام در دنا' subtitle='یکی از روش های زیر را برای ثبت نام در دنا انتخاب کنید.'>
				<p className='text-sm text-content/40 text-center max-w-72 mx-auto mt-10'>
					با ثبت نام در دنا شما با قوانین و مقررات استفاده از سرویس‌های سایت دنا موافقت می‌کنید
				</p>
			</AuthenticationPage>
		</main>
	)
}
