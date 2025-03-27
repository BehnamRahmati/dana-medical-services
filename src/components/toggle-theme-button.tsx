'use client'
import { Moon, Setting2, Sun1 } from 'iconsax-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'

const themes = ['system', 'light', 'dark']

export default function ToggleThemeButton() {
	const { theme, setTheme } = useTheme()
	const [visible, setVisible] = useState(theme)

	function toNextMode(index: number) {
		switch (themes[index]) {
			case 'light':
				setVisible('system')
				setTheme('system')
				break
			case 'dark':
				setVisible('light')
				setTheme('light')
				break
			default:
				setVisible('dark')
				setTheme('dark')
		}
	}
	return (
		<>
			{themes.map((thme, i) => (
				<button
					key={thme}
					type='button'
					onClick={() => toNextMode(i)}
					className={visible !== thme ? 'hidden' : 'bg-slate-100/70 rounded-full p-2 cursor-pointer text-slate-600'}
				>
					{theme === 'light' && <Sun1 size='25' className='fill-content' variant='Bulk' />}
					{theme === 'dark' && <Moon size='25' className='fill-slate-700' variant='Bulk' />}
					{theme === 'system' && <Setting2 size='25' className='fill-content' variant='Bulk' />}
				</button>
			))}
		</>
	)
}
