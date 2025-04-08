'use client'
import axios from 'axios'
import { useEffect } from 'react'

export default function PostViews({ postSlug }: { postSlug: string }) {
	useEffect(() => {
		async function addToViews() {
			await axios.get(`/api/articles/${postSlug}/views`)
		}
		addToViews()
	}, [postSlug])
	return <></>
}
