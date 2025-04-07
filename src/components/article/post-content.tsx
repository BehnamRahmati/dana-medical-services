export default function PostContent({ content }: { content: string }) {
	return <article className='my-5 content-area' dangerouslySetInnerHTML={{ __html: content }}></article>
}
