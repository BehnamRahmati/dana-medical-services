import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'static.roocket.ir',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'minio-m3wx75.chbk.app',
			},
			{
				protocol: 'https',
				hostname: 'homeca.ir',
			},
		],
	},
}

export default nextConfig
