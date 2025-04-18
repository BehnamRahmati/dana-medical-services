import { Editor } from '@tiptap/react'
import { TextalignCenter, TextalignJustifycenter, TextalignLeft, TextalignRight } from 'iconsax-react'
import Button from '../button'

export default function AlignButtons({ editor }: { editor: Editor }) {
	return (
		<>
			<Button
				type='button'
				size='icon'
				onClick={() => editor.chain().focus().setTextAlign('left').run()}
				variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'outline'}
			>
				<TextalignLeft className='size-5 stroke-content' variant='Broken' />
			</Button>
			<Button
				type='button'
				size='icon'
				onClick={() => editor.chain().focus().setTextAlign('center').run()}
				variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'outline'}
			>
				<TextalignCenter className='size-5 stroke-content' variant='Broken' />
			</Button>
			<Button
				type='button'
				size='icon'
				onClick={() => editor.chain().focus().setTextAlign('right').run()}
				variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'outline'}
			>
				<TextalignRight className='size-5 stroke-content' variant='Broken' />
			</Button>
			<Button
				type='button'
				size='icon'
				onClick={() => editor.chain().focus().setTextAlign('justify').run()}
				variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'outline'}
			>
				<TextalignJustifycenter className='size-5 stroke-content' variant='Broken' />
			</Button>
		</>
	)
}
