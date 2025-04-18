import { Editor } from '@tiptap/react'
import { Text } from 'iconsax-react'
import Button from '../button'
export default function TextSizeButtons({ editor }: { editor: Editor }) {
	return (
		<>
			<Button
				type='button'
				size='icon'
				onClick={() => editor.chain().focus().setParagraph().run()}
				variant={editor.isActive('paragraph') ? 'default' : 'outline'}
			>
				<Text className='size-5 stroke-content' variant='Broken' />
			</Button>
			<Button
				type='button'
				size='icon'
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
				className='pb-1'
			>
				H2
			</Button>
			<Button
				type='button'
				size='icon'
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'outline'}
				className='pb-1'
			>
				H3
			</Button>
			<Button
				type='button'
				size='icon'
				onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				variant={editor.isActive('heading', { level: 4 }) ? 'default' : 'outline'}
				className='pb-1'
			>
				H4
			</Button>
		</>
	)
}
