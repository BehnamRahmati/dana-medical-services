'use client'

import { fetchArticles } from '@/lib/helpers'
import { TArticle } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

type TArticlesContext = {
	data: TArticle[]
	isLoading: boolean
}

export const ArticlesContext = React.createContext<TArticlesContext | null>(null)

export default function ArticlesProvider({ children }: { children: React.ReactNode }) {
	const searchParams = useSearchParams()

	const url = searchParams?.size !== 0 ? `?${searchParams}` : ''
	const { data, isLoading } = useSWR(`/api/articles${url}`, fetchArticles)

	return <ArticlesContext.Provider value={{ data: data || [], isLoading }}>{children}</ArticlesContext.Provider>
}
