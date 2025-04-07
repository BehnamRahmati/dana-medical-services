import axios from 'axios'
import { TArticles, TCategory, TTag } from './types'

export async function fetchArticles(url: string): Promise<TArticles[]> {
	const response = await axios.get(url)
	return response.data.articles
}

export async function fetchTags(url: string): Promise<TTag[]> {
	const response = await axios.get(url)
	return response.data.tags
}

export async function fetchCategory(url: string): Promise<TCategory[]> {
	const response = await axios.get(url)
	return response.data.categories
}
