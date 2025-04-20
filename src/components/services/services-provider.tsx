'use client'

import { dataFetcher } from '@/lib/helpers'
import { TService } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
import useSWR from 'swr'

type TData = {
	services: TService[]
	pagination: {
		currentPage: number
		totalPages: number
		totalServices: number
		limit: number
	}
}

type TServicesContext = {
	data: TData | undefined
	isLoading: boolean
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: any
}

export const ServicesContext = React.createContext<TServicesContext | null>(null)

export default function ServicesProvider({ children }: { children: React.ReactNode }) {
	const searchParams = useSearchParams()

	const url = searchParams?.size !== 0 ? `?${searchParams}` : ''
	const { data, isLoading, error } = useSWR<TData>([`/api/services${url}`, 'services-services'], dataFetcher)

	const contextvalues = useMemo(() => ({ data: data, isLoading, error }), [data, isLoading, error])

	return <ServicesContext.Provider value={contextvalues}>{children}</ServicesContext.Provider>
}
