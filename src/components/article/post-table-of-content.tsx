'use client'

import { TableDocument } from 'iconsax-react'
import React, { useEffect } from 'react'

export default function ArticleTableOfContent({ content }: { content: string }) {
	const [headings, setHeadings] = React.useState<{ text: string; level: number }[]>([])

	useEffect(() => {
		const headings = content.match(/<h[2-4][^>]*>(.*?)<\/h[2-4]>/g) || []
		const headingsData = headings.map(heading => {
			const matches = heading.match(/<h([2-4])[^>]*>(.*?)<\/h[2-4]>/)
			const level = matches ? parseInt(matches[1], 10) : 1
			const div = document.createElement('div')
			div.innerHTML = matches ? matches[2] : ''
			const text = div.innerText.trim()
			return { text, level }
		})
		setHeadings(headingsData)
	}, [content])

	console.warn(headings)

	const renderHeadings = (headings: { text: string; level: number }[]) => {
		const renderList = (level: number) => {
			return headings
				.filter(heading => heading.level === level)
				.map((heading, index) => (
					<li key={index} style={{ marginLeft: `${(heading.level - 1) * 20}px` }}>
						<a
							href={`#${heading.text.replace(/\s+/g, '-').toLowerCase()}`}
							dangerouslySetInnerHTML={{ __html: heading.text }}
						/>
						{/* Recursively render nested levels */}
						{headings.some(h => h.level === level + 1 && h.text.startsWith(heading.text)) && (
							<ul>{renderList(level + 1)}</ul>
						)}
					</li>
				))
		}

		return <ul className='flex flex-col gap-2'>{renderList(2)}</ul>
	}
	return (
		<div className='p-5 border border-border rounded-lg'>
			<div className='flex items-center gap-2 mb-5'>
				<TableDocument className='fill-content size-5' variant='Bulk' />
				<div className='text-lg font-bold '>جدول مطالب</div>
			</div>

			<nav> {renderHeadings(headings)}</nav>
		</div>
	)
}
