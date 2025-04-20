'use client'

import { dataFetcher } from '@/lib/helpers'
import { TArticle } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
import useSWR from 'swr'

type TData = {
	articles: TArticle[]
	pagination: {
		currentPage: number
		totalPages: number
		totalArticles: number
		limit: number
	}
}

type TArticlesContext = {
	data: TData | undefined
	isLoading: boolean
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: any
}

export const ArticlesContext = React.createContext<TArticlesContext | null>(null)

export default function ArticlesProvider({ children }: { children: React.ReactNode }) {
	const searchParams = useSearchParams()

	const url = searchParams?.size !== 0 ? `?${searchParams}` : ''
	const { data, isLoading, error } = useSWR<TData>([`/api/articles${url}`, 'articles-articles'], dataFetcher)
	const contextValue = useMemo(
		() => ({
			data,
			isLoading,
			error,
		}),
		[data, isLoading, error],
	)

	return <ArticlesContext.Provider value={contextValue}>{children}</ArticlesContext.Provider>
}
