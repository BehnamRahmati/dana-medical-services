'use client'
import { Moon, Setting2, Sun1 } from 'iconsax-react'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'

export default function ToggleThemeButton() {
	const { theme, setTheme } = useTheme()
	const [visible, setVisible] = useState('')

	const themes = useMemo(
		() => [
			{ name: 'light', icon: <Sun1 size='25' className='fill-content' variant='Bulk' /> },
			{ name: 'dark', icon: <Moon size='25' className='fill-slate-700' variant='Bulk' /> },
			{ name: 'system', icon: <Setting2 size='25' className='fill-content' variant='Bulk' /> },
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
						className={`bg-slate-100/70 rounded-full p-2 cursor-pointer text-slate-600 ${visible === theme.name ? 'block' : 'hidden'}`}
					>
						{theme.icon}
					</button>
				))}
		</>
	)
}
