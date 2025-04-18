import { useCurrentEditor } from '@tiptap/react'
import axios from 'axios' // Import axios for API calls
import { Code1, Link1, Minus, QuoteDown } from 'iconsax-react'
import { ImClearFormatting } from 'react-icons/im'

import { useCallback } from 'react'
import { PiCodeLight, PiImageLight } from 'react-icons/pi' // Added PiImageLight
import { toast } from 'sonner'
import Button from '../button'
import AlignButtons from './align-buttons'
import ListButtons from './list-buttons'
import NavigationButtons from './navigation-buttons'
import TextSizeButtons from './text-size-buttons'
import TextStyleButtons from './text-style-buttons'

export default function MenuBar() {
	const { editor } = useCurrentEditor()

	if (!editor) {
		return null
	}

	// --- Add image upload logic ---
	const uploadImage = async (file: File): Promise<string | null> => {
		const formData = new FormData()
		formData.append('file', file)
		try {
			toast('در حال بارگذاری', { icon: '⏳' })
			const fileResponse = await axios.post('/api/dashboard/file', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			const fileRes = await fileResponse.data

			if (!fileRes?.file?.url) {
				throw new Error('Image URL not found in response')
			}
			toast('بارگذاری با موفقیت انجام شد', { icon: '✅' })
			return fileRes.file.url
		} catch (error) {
			console.error('Image upload failed:', error)
			toast('خطا در بارگذاری', { icon: '❌' })
			return null
		}
	}

	const handleImageUpload = () => {
		const input = document.createElement('input')
		input.setAttribute('type', 'file')
		input.setAttribute('accept', 'image/*')
		input.click()

		input.onchange = async () => {
			if (input.files && input.files[0]) {
				const file = input.files[0]
				try {
					const imageUrl = await uploadImage(file)
					if (imageUrl && editor) {
						editor.chain().focus().setImage({ src: imageUrl }).run()
					}
				} catch (error) {
					console.error('Image upload failed:', error)
					// Handle error (e.g., show a notification to the user)
				}
			}
		}
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const setLink = useCallback(() => {
		const previousUrl = editor.getAttributes('link').href
		const url = window.prompt('URL', previousUrl)

		// cancelled
		if (url === null) {
			return
		}

		// empty
		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run()
			return
		}

		// update link
		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
	}, [editor])

	return (
		<div className='control-group border-b border-border p-2.5'>
			<div className='flex flex-wrap gap-2.5'>
				<TextStyleButtons editor={editor} />
				<TextSizeButtons editor={editor} />
				<AlignButtons editor={editor} />
				<ListButtons editor={editor} />
				<Button
					type='button'
					size='icon'
					onClick={() => editor.chain().focus().toggleCode().run()}
					disabled={!editor.can().chain().focus().toggleCode().run()}
					className={editor.isActive('code') ? 'is-active' : ''}
				>
					<PiCodeLight className='size-5 stroke-content' />
				</Button>
				<Button size='icon' type='button' onClick={() => editor.chain().focus().unsetAllMarks().run()}>
					<ImClearFormatting className='size-4 stroke-content' />
				</Button>

				<Button
					type='button'
					size='icon'
					onClick={() => editor.chain().focus().toggleCodeBlock().run()}
					className={editor.isActive('codeBlock') ? 'is-active' : ''}
				>
					<Code1 className='size-5 stroke-content' variant='Broken' />
				</Button>
				<Button
					type='button'
					size='icon'
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={editor.isActive('blockquote') ? 'is-active' : ''}
				>
					<QuoteDown className='size-5 stroke-content' />
				</Button>
				{/* Add Image Button */}
				<Button type='button' size='icon' onClick={handleImageUpload}>
					<PiImageLight className='size-5 stroke-content' />
				</Button>
				<Button type='button' size='icon' onClick={() => editor.chain().focus().setHorizontalRule().run()}>
					<Minus className='size-5 stroke-content' variant='Broken' />
				</Button>
				<Button type='button' size='icon' className='pb-1' onClick={() => editor.chain().focus().setHardBreak().run()}>
					BR
				</Button>
				<Button onClick={setLink} size='icon' className={editor.isActive('link') ? 'is-active' : ''} type='button'>
					<Link1 className='size-5 stroke-content' variant='Broken' />
				</Button>
				<NavigationButtons editor={editor} />
			</div>
		</div>
	)
}
