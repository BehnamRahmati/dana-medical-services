import withBundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'minio-m3wx75.chbk.app',
			},
		],
	},
	experimental: {
		optimizePackageImports: ['iconsax-react', 'lucide-react', 'react-icons'],
	},
}

export default bundleAnalyzer(nextConfig)
