'use client'


import React from 'react'
import ThemeProvider from '@/components/theme-provider'

type TProps = {
	children: React.ReactNode
}


function Providers({children}: TProps) {
	return (
		<ThemeProvider attribute={'class'} defaultTheme='system' enableSystem disableTransitionOnChange>
			{children}
		</ThemeProvider>
	)
}

export default Providers