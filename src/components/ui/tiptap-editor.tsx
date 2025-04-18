import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image' // Import the Image extension
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import { Editor, EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menu-bar/menu-bar'

const extensions = [
	TextStyle,
	Image, // Add the Image extension
	TextAlign.configure({
		types: ['heading', 'paragraph'],
	}),
	Highlight,
	StarterKit.configure({
		bulletList: {
			keepMarks: true,
			keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
		},
		orderedList: {
			keepMarks: true,
			keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
		},
		// Disable default image handling if you only want custom uploads
		// image: false,
	}),
	Link.configure({
		openOnClick: false,
		autolink: true,
		defaultProtocol: 'https',
		protocols: ['http', 'https'],
		isAllowedUri: (url, ctx) => {
			try {
				// construct URL
				const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

				// use default validation
				if (!ctx.defaultValidate(parsedUrl.href)) {
					return false
				}

				// disallowed protocols
				const disallowedProtocols = ['ftp', 'file', 'mailto']
				const protocol = parsedUrl.protocol.replace(':', '')

				if (disallowedProtocols.includes(protocol)) {
					return false
				}

				// only allow protocols specified in ctx.protocols
				const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

				if (!allowedProtocols.includes(protocol)) {
					return false
				}

				// disallowed domains
				const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
				const domain = parsedUrl.hostname

				if (disallowedDomains.includes(domain)) {
					return false
				}

				// all checks have passed
				return true
			} catch {
				return false
			}
		},

		shouldAutoLink: url => {
			try {
				// construct URL
				const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

				// only auto-link if the domain is not in the disallowed list
				const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
				const domain = parsedUrl.hostname

				return !disallowedDomains.includes(domain)
			} catch {
				return false
			}
		},
	}),
]

export default function TiptapEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
	return (
		<div className='border border-border rounded-xl'>
			<EditorProvider
				editable={true}
				immediatelyRender={false}
				slotBefore={<MenuBar />}
				onUpdate={({ editor }: { editor: Editor }) => {
					// Call the onChange prop when content updates
					if (onChange) {
						onChange(editor.getHTML())
					}
				}}
				extensions={extensions}
				content={value}
			></EditorProvider>
		</div>
	)
}
