'use client'

import axios from 'axios'
import dynamic from 'next/dynamic'
import { RefObject, useRef } from 'react'
import ReactQuill from 'react-quill-new'
import { Skeleton } from './skeleton'

// Import Quill styles
import 'react-quill-new/dist/quill.snow.css' // For snow theme

const ReactQuillComponent = dynamic(
	async () => {
		const { default: RQ } = await import('react-quill-new')

		const Component = ({ forwardedRef, ...props }: { forwardedRef: RefObject<ReactQuill> } & ReactQuill.ReactQuillProps) => (
			<RQ ref={forwardedRef} {...props} />
		)

		Component.displayName = 'ReactQuillComponent'
		return Component
	},
	{
		ssr: false,
		loading: () => <Skeleton className='h-[600px] bg-content/10 w-full' />,
	},
)

ReactQuillComponent.displayName = 'ReactQuillComponent'

function QuillEditor({ onChangeEditor, editorValue }: { onChangeEditor: (value: string) => void; editorValue: string }) {
	const quillRef = useRef<ReactQuill | null>(null)

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
				const editor = quillRef.current?.getEditor ? quillRef.current.getEditor() : null
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
				[{ direction: 'rtl' }], // text direction
				[{ align: [] }],
				[{ color: [] }, { background: [] }],
				[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
				['blockquote', 'code-block'],
				['link', 'image'],
				['table'],
				['clean'],
			],
			handlers: {
				image: handleImageUpload, // Use the custom image handler
			},
		},
	}

	return (
		<div dir='ltr' className='h-80'>
			<ReactQuillComponent
				forwardedRef={quillRef as RefObject<ReactQuill>}
				className='h-56 mb-32 lg:mb-16'
				theme='snow'
				value={editorValue}
				onChange={e => onChangeEditor(e)}
				modules={quillModules}
			/>
		</div>
	)
}

export default QuillEditor
