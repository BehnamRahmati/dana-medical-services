import { Element } from 'html-react-parser'
import { toast } from 'sonner'
const publicNextUrl = process.env.NEXT_PUBLIC_URL

// Base fetcher function to handle common logic
async function baseFetcher<T>(url: string, options?: RequestInit): Promise<T> {
	const response = await fetch(url, options)
	if (!response.ok) {
		let errorData = `Failed to fetch data from ${url}: ${response.statusText}`
		try {
			// Attempt to parse error details from the response body
			const data = await response.json()
			errorData = data?.message || data?.error || JSON.stringify(data) || errorData
		} catch {
			// Ignore if response body is not JSON or empty
		}
		throw new Error(errorData)
	}

	return response.json() as Promise<T>
}

// Client-side data fetcher
export function dataFetcher<T>([url]: string[], options?: RequestInit): Promise<T> {
	return baseFetcher<T>(url, { method: 'GET', ...options })
}

// Server-side data fetcher
export function serverDataFetcher<T>([url]: string[], options?: RequestInit): Promise<T> {
	const fullUrl = `${publicNextUrl}${url}`
	return baseFetcher<T>(fullUrl, { method: 'GET', ...options })
}

export const getAttribute = (domNode: Element, attribute: string, defaultValue: string | number = ''): string | number => {
	return domNode.attribs?.[attribute] || defaultValue
}

// Utility function to extract error message
const getErrorMessage = (error: unknown): string => {
	if (error instanceof Error) {
		// Attempt to parse JSON from the error message if it looks like a JSON string
		try {
			// A simple check if the message might be JSON (could be refined)
			if (error.message.trim().startsWith('{') && error.message.trim().endsWith('}')) {
				const parsedError = JSON.parse(error.message)
				return parsedError?.message || parsedError?.error || error.message
			}
		} catch {
			// Ignore if parsing fails, fall back to the original error message
		}
		return error.message
	}
	if (typeof error === 'string') {
		return error
	}
	return 'An unknown error occurred. Please try again.' // Fallback message in English
}

export async function handleToastPromise<TResponse>(
	promiseFn: () => Promise<TResponse>, // TResponse might not always be Response if baseFetcher handles JSON parsing
	loadingMessage: string,
	successMessage: string,
	errorMessagePrefix: string,
	onSuccessCallback?: (response: TResponse) => void | Promise<void>,
) {
	toast.promise(promiseFn(), {
		loading: loadingMessage,
		success: async response => {
			// Assuming promiseFn throws for non-ok responses, no need to check response.ok here
			if (onSuccessCallback) {
				await onSuccessCallback(response)
			}
			return successMessage
		},
		error: (error: unknown) => {
			console.error(`Error in ${errorMessagePrefix}:`, error)
			const displayError = getErrorMessage(error)
			// Using English prefix and potentially localized error message
			return `${errorMessagePrefix}: ${displayError}`
		},
	})
}
