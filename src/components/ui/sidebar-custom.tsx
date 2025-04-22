import useCollapsible from '@/hooks/use-callapsible'
import useSidebar from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { ArrowDown2, ArrowLeft2, SidebarLeft, SidebarRight } from 'iconsax-react'
import React from 'react'

type TSidebarContext = {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type TCollapsibleContext = {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CollapsibleContext = React.createContext<TCollapsibleContext | null>(null)

const SidebarContext = React.createContext<TSidebarContext | undefined>(undefined)

function SidebarProvider({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = React.useState(false)
	return <SidebarContext value={{ isOpen, setIsOpen }}>{children}</SidebarContext>
}

function Sidebar({ className, ...props }: React.ComponentProps<'div'>) {
	const { isOpen } = useSidebar()
	return (
		<aside className={`transition-[width] duration-300 shrink-0 ${isOpen ? 'w-80' : 'w-[calc(var(--spacing)*25)]'}`}>
			<div
				className={`p-5 bg-accent rounded-2xl h-[calc(100dvh-var(--spacing)*10)] ${isOpen ? 'w-[calc(var(--spacing)*75)]' : 'w-[calc(var(--spacing)*20)]'} transition-[width] duration-300 fixed top-5 bottom-5 right-5 overflow-hidden`}
			>
				<div className={cn(`h-full flex flex-col overflow-hidden`, className)} {...props} />
			</div>
		</aside>
	)
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
	return <div className={cn('flex-1 overflow-y-auto no-scrollbar overflow-x-hidden', className)} {...props} />
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return <div className={cn('', className)} {...props} />
}
function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return <div className={cn('', className)} {...props} />
}

function SidebarSeperator({ className, ...props }: React.ComponentProps<'div'>) {
	return <div className={cn('border-b border-b-border w-full mx-auto my-2.5', className)} {...props} />
}

function SidebarTrigger() {
	const { isOpen, setIsOpen } = useSidebar()
	return (
		<button
			type='button'
			className='flex items-center gap-1.5 *:shrink-0 group *:transition-transform *:duration:200'
			onClick={() => setIsOpen(prev => !prev)}
		>
			{isOpen ? (
				<SidebarRight
					className='size-8.5 stroke-content transform group-hover:scale-110 p-1 rounded-lg'
					variant='Broken'
				/>
			) : (
				<SidebarLeft
					className='size-8.5 stroke-content transform group-hover:scale-110 p-1 rounded-lg'
					variant='Broken'
				/>
			)}
			<p className=' px-2.5 pb-1 pt-1.5 rounded-lg'>باز و بسته کردن سایدبار</p>
		</button>
	)
}

function SidebarMenu({ className, isSubMenu, ...props }: React.ComponentProps<'ul'> & { isSubMenu?: boolean }) {
	let subMenuClasses
	const { isOpen } = useSidebar()
	if (isSubMenu) {
		subMenuClasses = 'px-2.5 *:py-1 my-2 *:hover:font-bold'
	}
	if (isSubMenu && isOpen) {
		subMenuClasses = 'pr-2.5 mr-5 border-r border-border *:py-1 my-2 *:hover:font-bold'
	}
	return <ul className={cn(`flex flex-col gap-2 ${subMenuClasses}`, className)} {...props} />
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
	return <li className={cn('flex items-center gap-2 w-full', className)} {...props} />
}

function SidebarCollapsible({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = React.useState(false)
	return (
		<CollapsibleContext.Provider value={{ isOpen, setIsOpen }}>
			<div className='flex flex-col w-full'>{children}</div>
		</CollapsibleContext.Provider>
	)
}

function SidebarCollapsibleTrigger({ children, title }: { children: React.ReactNode; title: string }) {
	const { isOpen, setIsOpen } = useCollapsible()
	return (
		<div className='flex items-center justify-between gap-2 w-full py-1' onClick={() => setIsOpen(prev => !prev)}>
			<div className='flex items-center flex-1 gap-2 *:shrink-0 cursor-pointer group '>
				<div className='*:h-8.5 *:stroke-content *:transform group-hover:*:scale-110 *:p-1 *:transition-transform *:duration:200'>
					{children}
				</div>

				<p className='text-lg font-bold px-2.5 pb-1 pt-2 leading-6 rounded-lg'>{title}</p>
			</div>
			{isOpen ? (
				<ArrowDown2 className='fill-content size-5' variant='Bulk' />
			) : (
				<ArrowLeft2 className='fill-content size-5' variant='Bulk' />
			)}
		</div>
	)
}

function SidebarCollapsibleContent({ children }: { children: React.ReactNode }) {
	const { isOpen } = useCollapsible()
	return <div className={`${isOpen ? 'h-auto' : 'h-0'} overflow-hidden`}>{children}</div>
}

export {
	CollapsibleContext,
	Sidebar,
	SidebarCollapsible,
	SidebarCollapsibleContent,
	SidebarCollapsibleTrigger,
	SidebarContent,
	SidebarContext,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarProvider,
	SidebarSeperator,
	SidebarTrigger,
}
