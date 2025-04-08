import AuthenticationPage from '@/components/authentication-page'
import LoginForm from '@/components/login/login-form'

export default function LoginPage() {
	return (
		<main>
			<AuthenticationPage title='ورود به حساب' subtitle='یکی از روش های زیر را برای ورود به حساب کاربریتان انتخاب کنید.'>
				<LoginForm />
			</AuthenticationPage>
		</main>
	)
}
