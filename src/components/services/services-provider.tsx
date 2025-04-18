'use client'

import { fetchServices } from '@/lib/helpers'
import { TService } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
import useSWR from 'swr'

type TServicesContext = {
	data: TService[]
	isLoading: boolean
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: any
}

export const ServicesContext = React.createContext<TServicesContext | null>(null)

export default function ServicesProvider({ children }: { children: React.ReactNode }) {
	const searchParams = useSearchParams()

	const url = searchParams?.size !== 0 ? `?${searchParams}` : ''
	const { data, isLoading, error } = useSWR(`/api/services${url}`, fetchServices)

	const contextvalues = useMemo(() => ({ data: data || [], isLoading, error }), [data, isLoading, error])

	return <ServicesContext.Provider value={contextvalues}>{children}</ServicesContext.Provider>
}
