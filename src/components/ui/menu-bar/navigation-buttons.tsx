import { Editor } from '@tiptap/react'
import { ArrowForward, Back } from 'iconsax-react'
import Button from '../button'

export default function NavigationButtons({ editor }: { editor: Editor }) {
	return (
		<>
			<Button
				type='button'
				size='icon'
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
			>
				<Back className='size-5 stroke-content' variant='Broken' />
			</Button>
			<Button
				type='button'
				size='icon'
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
			>
				<ArrowForward className='size-5 stroke-content' variant='Broken' />
			</Button>
		</>
	)
}
