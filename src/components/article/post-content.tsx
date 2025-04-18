import { getAttribute } from '@/lib/helpers'
import parse, { Element, HTMLReactParserOptions } from 'html-react-parser'
import Image from 'next/image'

export default function PostContent({ content }: { content: string }) {
	const options: HTMLReactParserOptions = {
		replace: domNode => {
			// Check if the node is an <img> tag
			if (domNode instanceof Element && domNode.name === 'img') {
				const src = getAttribute(domNode, 'src', '') as string
				const alt = getAttribute(domNode, 'alt', 'Article image') as string
				// Attempt to get width/height, provide defaults if missing or invalid
				const widthAttr = getAttribute(domNode, 'width')
				const heightAttr = getAttribute(domNode, 'height')

				// Use default dimensions if attributes are missing or invalid
				const width = parseInt(widthAttr as string, 10) || 700 // Default width
				const height = parseInt(heightAttr as string, 10) || 400 // Default height

				if (src) {
					return (
						<Image
							src={src}
							alt={alt}
							width={width}
							height={height}
							loading='lazy'
							className='my-4 rounded-md'
							sizes='(max-width: 768px) 100vw, 700px'
						/>
					)
				}
			}
			// Return undefined to use default parsing for other elements
			return undefined
		},
	}

	return <article className='my-5 content-area'>{parse(content, options)}</article>
}
