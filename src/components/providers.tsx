'use client'

import ThemeProvider from '@/components/theme-provider'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

type TProps = {
	children: React.ReactNode
}

function Providers({ children }: TProps) {
	return (
		<SessionProvider>
			<ThemeProvider attribute={'class'} defaultTheme='system' enableSystem disableTransitionOnChange>
				{children}
			</ThemeProvider>
		</SessionProvider>
	)
}

export default Providers
