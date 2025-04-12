import axios from 'axios'

async function dataFetcher<T>(url: string): Promise<T> {
	const response = await axios.get(url)
	return await response.data
}

export { dataFetcher }
