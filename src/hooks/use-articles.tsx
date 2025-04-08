'use client'

import { ArticlesContext } from '@/components/articles/articles-provider'
import React from 'react'

export default function useArticles() {
	const context = React.useContext(ArticlesContext)
	if (!context) {
		throw new Error('useSelect must be used within a ArticlesProvider.')
	}

	return context
}
