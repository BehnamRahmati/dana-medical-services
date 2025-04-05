'use client'

import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import QuillEditorRef from 'react-quill-new'
// import ForwardedReactQuill from './ForwardedReactQuill'

// Dynamically import the Quill editor to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

// Import Quill styles
import 'react-quill-new/dist/quill.snow.css' // For snow theme

function QuillEditor({ onChangeEditor, editorValue }: { onChangeEditor: (value: string) => void; editorValue: string }) {
	const quillRef = useRef<QuillEditorRef>(null)

	const uploadImage = async (file: File): Promise<string> => {
		const formData = new FormData()
		formData.append('file', file)
		const fileResponse = await axios.post('/api/dashboard/file', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
		const fileRes = await fileResponse.data
		console.warn(fileRes)

		return fileRes.file.url // Return the URL of the uploaded image
	}

	// Custom image handler that triggers file input
	const handleImageUpload = () => {
		const input = document.createElement('input')
		input.setAttribute('type', 'file')
		input.setAttribute('accept', 'image/*')
		input.click()

		input.onchange = async () => {
			if (input.files && input.files[0]) {
				const file = input.files[0]
				const imageUrl = await uploadImage(file)
				// Get the Quill editor instance
				const editor = quillRef.current?.getEditor()
				console.warn('imageUrl', imageUrl)
				if (editor) {
					const range = editor.getSelection(true)

					if (range) {
						// Insert the image at the current cursor position
						editor.insertEmbed(range.index, 'image', imageUrl)

						// Move cursor after image to avoid "image" text getting typed next to it
						editor.setSelection(range.index + 1, 0)
					}
				}
			}
		}
	}

	const quillModules = {
		toolbar: {
			container: [
				[{ header: [2, 3, 4, false] }],
				[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
				['bold', 'italic', 'underline', 'strike'],
				['blockquote', 'code-block'],
				['link', 'image'],
				[{ color: [] }, { background: [] }],
				[{ align: [] }],
				['table'],
				['clean'],
			],
			handlers: {
				image: handleImageUpload, // Use the custom image handler
			},
		},
	}

	return (
		<div dir='ltr'>
			<ReactQuill
				ref={quillRef}
				className='h-96 mb-28 lg:mb-10'
				theme='snow'
				value={editorValue}
				onChange={e => onChangeEditor(e)}
				modules={quillModules}
			/>
		</div>
	)
}

export default QuillEditor
