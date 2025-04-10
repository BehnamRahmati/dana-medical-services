import axios from 'axios'

import { TArticles, TCategory, TComment, TServices, TTag, TUser } from './types'

export async function fetchArticles(url: string): Promise<TArticles[]> {
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
export async function fetchServices(url: string): Promise<TServices[]> {
	const response = await axios.get(url)
	return response.data.services
}
export async function fetchComments(url: string): Promise<TComment[]> {
	const response = await axios.get(url)
	return response.data.comments
}
