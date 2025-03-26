import React from 'react'

export default function Title({ children }: { children: React.ReactNode }) {
	return (
		<h2 className='text-primary text-6xl font-extrabold flex flex-col'>
			<span>{children}</span>
			<span className='h-10 w-32 bg-primary/20 -mt-10 rounded-lg -mr-2'></span>
		</h2>
	)
}
