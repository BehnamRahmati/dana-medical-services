import React from 'react'

export default function Title({ children }: { children: React.ReactNode }) {
	return (
		<h2 className='text-primary text-6xl font-extrabold flex flex-col w-fit text-center md:text-right '>
			<span>{children}</span>
			<span className='h-10 min-w-32 w-2/3 bg-primary/20 -mt-10 rounded-lg -mr-2 hidden md:block'></span>
		</h2>
	)
}
