import { Editor } from '@tiptap/react'
import { TextBold, TextItalic } from 'iconsax-react'
import { PiHighlighterLight, PiTextStrikethroughLight } from 'react-icons/pi'
import Button from '../button'

export default function TextStyleButtons({ editor }: { editor: Editor }) {
	return (
		<>
			<Button
				type='button'
				size='icon'
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				variant={editor.isActive('bold') ? 'default' : 'outline'}
			>
				<TextBold className='size-5 stroke-content' variant='Broken' />
			</Button>
			<Button
				type='button'
				size='icon'
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				variant={editor.isActive('italic') ? 'default' : 'outline'}
			>
				<TextItalic className='size-5 stroke-content' variant='Broken' />
			</Button>
			<Button
				type='button'
				size='icon'
				onClick={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				variant={editor.isActive('strike') ? 'default' : 'outline'}
			>
				<PiTextStrikethroughLight className='size-5 stroke-content' />
			</Button>
			<Button
				type='button'
				size='icon'
				onClick={() => editor.chain().focus().toggleHighlight().run()}
				variant={editor.isActive('highlight') ? 'default' : 'outline'}
				className='pb-1'
			>
				<PiHighlighterLight className='size-5 stroke-content' />
			</Button>
		</>
	)
}
