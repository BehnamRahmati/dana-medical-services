'use client'

import { fetchArticles } from '@/lib/helpers'
import { TArticles } from '@/lib/types'
import React from 'react'
import useSWR from 'swr'

type TArticlesContext = {
	address: string
	setAddress: React.Dispatch<React.SetStateAction<string>>
	articles: TArticles[] | undefined
	isLoading: boolean
}

export const ArticlesContext = React.createContext<TArticlesContext | null>(null)

export default function ArticlesContainer({ children }: { children: React.ReactNode }) {
	const [address, setAddress] = React.useState('/api/articles')
	const { data: articles, isLoading } = useSWR(address, fetchArticles)
	return <ArticlesContext.Provider value={{ address, setAddress, articles, isLoading }}>{children}</ArticlesContext.Provider>
}
