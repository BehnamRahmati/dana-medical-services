'use client'

import { fetchArticles } from '@/lib/helpers'
import { TArticle } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
import useSWR from 'swr'

type TArticlesContext = {
	data: TArticle[]
	isLoading: boolean
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: any
}

export const ArticlesContext = React.createContext<TArticlesContext | null>(null)

export default function ArticlesProvider({ children }: { children: React.ReactNode }) {
	const searchParams = useSearchParams()

	const url = searchParams?.size !== 0 ? `?${searchParams}` : ''
	const { data, isLoading, error } = useSWR(`/api/articles${url}`, fetchArticles)
	const contextValue = useMemo(
		() => ({
			data: data || [],
			isLoading,
			error,
		}),
		[data, isLoading, error],
	)

	return <ArticlesContext.Provider value={contextValue}>{children}</ArticlesContext.Provider>
}
