'use client'

import { ServicesContext } from '@/components/services/services-provider'
import React from 'react'

export default function useServices() {
	const context = React.useContext(ServicesContext)
	if (!context) {
		throw new Error('useSelect must be used within a ServicesProvider.')
	}

	return context
}
