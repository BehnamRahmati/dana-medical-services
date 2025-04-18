import Header from '@/components/header/header'
import Providers from '@/components/providers'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'
import './globals.css'

const Footer = dynamic(() => import('@/components/footer/footer'))

export const metadata: Metadata = {
	title: 'خدمات پزشکی دنا',
	description: 'ارائه خدمات پزشکی در خانه و محل کار',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='fa_IR' dir='rtl' suppressHydrationWarning>
			<body className='antialiased flex flex-col min-h-dvh'>
				<Providers>
					<Header />
					<div className='flex-1'>{children}</div>
					<Footer />
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
