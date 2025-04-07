import axios from 'axios'
import { TArticles, TTag } from './types'

export async function fetchArticles(url: string): Promise<TArticles[]> {
	const response = await axios.get(url)
	return response.data.articles
}

export async function fetchTags(url: string): Promise<TTag[]> {
	const response = await axios.get(url)
	return response.data.tags
}
