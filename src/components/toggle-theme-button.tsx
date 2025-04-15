'use client'
import { Moon, Setting2, Sun1 } from 'iconsax-react'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'

export default function ToggleThemeButton() {
	const { theme, setTheme } = useTheme()
	const [visible, setVisible] = useState('')

	const themes = useMemo(
		() => [
			{ name: 'light', icon: <Sun1 className='fill-content size-5' variant='Bulk' /> },
			{ name: 'dark', icon: <Moon className='fill-content size-5' variant='Bulk' /> },
			{ name: 'system', icon: <Setting2 className='fill-content size-5' variant='Bulk' /> },
		],
		[],
	)

	function toNextMode(name: string) {
		switch (name) {
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
				break
		}
	}

	useEffect(() => {
		if (theme) {
			setVisible(theme)
		}
	}, [theme])
	return (
		<>
			{visible &&
				themes.map(theme => (
					<button
						key={theme.name}
						type='button'
						onClick={() => toNextMode(theme.name)}
						className={`bg-content/20 rounded-lg p-2 cursor-pointer hover:bg-content/30 text-slate-600 shrink-0 ${visible === theme.name ? 'block' : 'hidden'}`}
					>
						{theme.icon}
					</button>
				))}
		</>
	)
}
