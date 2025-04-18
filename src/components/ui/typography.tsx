import { cn } from '@/lib/utils'

function H1({ className, ...props }: React.ComponentProps<'h1'>) {
	return <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)} {...props} />
}
function H2({ className, ...props }: React.ComponentProps<'h2'>) {
	return <h2 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)} {...props} />
}
function H3({ className, ...props }: React.ComponentProps<'h3'>) {
	return (
		<h3 className={cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', className)} {...props} />
	)
}
function H4({ className, ...props }: React.ComponentProps<'h4'>) {
	return <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props} />
}
function Paragraph({ className, ...props }: React.ComponentProps<'p'>) {
	return <p className={cn('leading-7 text-base lg:text-lg [&:not(:first-child)]:mt-6', className)} {...props} />
}
function BlockQuote({ className, ...props }: React.ComponentProps<'blockquote'>) {
	return <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props} />
}
function List({ className, ...props }: React.ComponentProps<'ul'>) {
	return <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props} />
}
function InlinecCode({ className, ...props }: React.ComponentProps<'code'>) {
	return (
		<code
			className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold', className)}
			{...props}
		/>
	)
}
function Lead({ className, ...props }: React.ComponentProps<'p'>) {
	return <p className={cn('text-xl text-muted-foreground', className)} {...props} />
}
function Large({ className, ...props }: React.ComponentProps<'div'>) {
	return <div className={cn('text-lg font-semibold', className)} {...props} />
}
function Small({ className, ...props }: React.ComponentProps<'small'>) {
	return <small className={cn('text-sm font-medium leading-none', className)} {...props} />
}
function Muted({ className, ...props }: React.ComponentProps<'p'>) {
	return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}

export { BlockQuote, H1, H2, H3, H4, InlinecCode, Large, Lead, List, Muted, Paragraph, Small }
