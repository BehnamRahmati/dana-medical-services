'use client'

import { fetchServices } from '@/lib/helpers'
import { TService } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

type TServicesContext = {
	data: TService[]
	isLoading: boolean
}

export const ServicesContext = React.createContext<TServicesContext | null>(null)

export default function ServicesProvider({ children }: { children: React.ReactNode }) {
	const searchParams = useSearchParams()

	const url = searchParams?.size !== 0 ? `?${searchParams}` : ''
	const { data, isLoading } = useSWR(`/api/services${url}`, fetchServices)
	console.warn(data)

	return <ServicesContext.Provider value={{ data: data || [], isLoading }}>{children}</ServicesContext.Provider>
}
