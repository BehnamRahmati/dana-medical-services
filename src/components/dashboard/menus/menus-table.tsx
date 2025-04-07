'use client'
import { TMenu } from '@/lib/types'
import axios from 'axios'
import useSWR from 'swr'
import { menusColumns } from './menus-column'
import MenusDataTable from './menus-data-table'

async function fetcher(url: string): Promise<{ menus: TMenu[] }> {
	const response = await axios.get(url)
	return await response.data
}

export default function MenusTable() {
	const { data, isLoading, mutate } = useSWR('/api/dashboard/menus', fetcher)

	if (isLoading || !data) return <p>loading</p>

	return <MenusDataTable data={data.menus} columns={menusColumns} mutate={mutate} />
}
