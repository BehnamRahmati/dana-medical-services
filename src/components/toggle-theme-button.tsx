'use client'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { PiGearSixDuotone, PiMoonStarsDuotone, PiSunDimDuotone } from 'react-icons/pi'

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
					{theme === 'light' && <PiSunDimDuotone className='size-6' />}
					{theme === 'dark' && <PiMoonStarsDuotone className='size-6' />}
					{theme === 'system' && <PiGearSixDuotone className='size-6' />}
				</button>
			))}
		</>
	)
}
