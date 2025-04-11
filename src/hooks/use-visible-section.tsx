import { useEffect, useRef, useState } from 'react'

export default function useVisibleSection() {
	const [isVisible, setIsVisible] = useState(false)
	const sectionRef = useRef(null)

	useEffect(() => {
		const section = sectionRef.current
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting) {
					setIsVisible(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.1 },
		)

		if (section) {
			observer.observe(section)
		}

		return () => {
			if (section) {
				observer.unobserve(section)
			}
		}
	}, [])
	return { sectionRef, isVisible }
}
