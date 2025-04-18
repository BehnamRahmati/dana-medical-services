import { Editor } from '@tiptap/react'
import { PiListBulletsLight, PiListNumbersLight } from 'react-icons/pi'
import Button from '../button'

export default function ListButtons({ editor }: { editor: Editor }) {
	return (
		<>
			<Button
				type='button'
				size='icon'
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				variant={editor.isActive('bulletList') ? 'default' : 'outline'}
			>
				<PiListBulletsLight className='size-5 stroke-content' />
			</Button>
			<Button
				type='button'
				size='icon'
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				variant={editor.isActive('orderedList') ? 'default' : 'outline'}
			>
				<PiListNumbersLight className='size-5 stroke-content' />
			</Button>
		</>
	)
}
