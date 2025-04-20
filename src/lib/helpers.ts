import axios from 'axios'
import { Element } from 'html-react-parser'
import { toast } from 'sonner'
import { TArticle, TCategory, TComment, TRequest, TService, TTag, TUser } from './types'

export async function fetchArticles(url: string): Promise<TArticle[]> {
	const response = await axios.get(url)
	return response.data.articles
}

export async function fetchTags(url: string): Promise<TTag[]> {
	const response = await axios.get(url)
	return response.data.tags
}
export async function fetchUsers(url: string): Promise<TUser[]> {
	const response = await axios.get(url)
	return response.data.users
}
export async function fetchCategory(url: string): Promise<TCategory[]> {
	const response = await axios.get(url)
	return response.data.categories
}
export async function fetchServices(url: string): Promise<TService[]> {
	const response = await axios.get(url)
	return response.data.services
}
export async function fetchComments(url: string): Promise<TComment[]> {
	const response = await axios.get(url)
	return response.data.comments
}
export async function fetchRequests(url: string): Promise<TRequest[]> {
	const response = await axios.get(url)
	return response.data.requests
}
export async function fetchServicesCategories(url: string): Promise<TCategory[]> {
	const response = await axios.get(url)
	return response.data.categories
}

export async function dataFetcher<T>([url]: string[], options?: RequestInit): Promise<T> {
	const response = await fetch(url, { method: 'GET', ...options })
	if (!response.ok) {
		throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`)
	}
	return response.json() as Promise<T>
	return await response.json()
}

export async function serverDataFetcher<T>(url: string, options?: RequestInit): Promise<T> {
	const response = await fetch(`${process.env.NEXTAUTH_URL}${url}`, { method: 'GET', cache: 'force-cache', ...options })
	if (!response.ok) {
		throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`)
	}
	return response.json() as Promise<T>
}

export const getAttribute = (domNode: Element, attribute: string, defaultValue: string | number = ''): string | number => {
	return domNode.attribs?.[attribute] || defaultValue
}

export async function handleToastPromise<TResponse extends Response>(
	promiseFn: () => Promise<TResponse>,
	loadingMessage: string,
	successMessage: string,
	errorMessagePrefix: string,
	onSuccessCallback?: (response: TResponse) => void | Promise<void>,
) {
	toast.promise(promiseFn(), {
		loading: loadingMessage,
		success: async response => {
			if (!response.ok) {
				let errorData = 'Unknown error'
				try {
					const data = await response.json()
					errorData = data?.message || data?.error || JSON.stringify(data) || `خطا با کد وضعیت ${response.status}`
				} catch (e) {
					console.log(e)
					errorData = `خطا با کد وضعیت ${response.status}`
				}
				throw new Error(errorData)
			}
			if (onSuccessCallback) {
				await onSuccessCallback(response)
			}
			return successMessage
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		error: (error: any) => {
			console.error(`Error in ${errorMessagePrefix}:`, error)
			const displayError = error?.message || 'لطفا دوباره تلاش کنید.'
			return `${errorMessagePrefix}: ${displayError}`
		},
	})
}
