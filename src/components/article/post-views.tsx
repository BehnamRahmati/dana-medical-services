'use client'
import { useEffect } from 'react'

export default function PostViews({ postSlug }: { postSlug: string }) {
	useEffect(() => {
		async function addToViews() {
			try {
				const response = await fetch(`/api/articles/${postSlug}/views`)
				if (!response.ok) {
					console.error(`Failed to increment view count: ${response.status} ${response.statusText}`)
				}
			} catch (error) {
				console.error('Error sending view count request:', error)
			}
		}
		addToViews()
	}, [postSlug])
	return null
}
