'use client'

import { useState, useEffect } from 'react'
import { getSiteConfig } from '@/lib/notion'

interface SiteNameProps {
  className?: string
  fallback?: string
}

export function SiteName({ className = '', fallback = 'AI Blog MVP' }: SiteNameProps) {
  const [siteName, setSiteName] = useState<string>(fallback)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchSiteName() {
      try {
        const config = await getSiteConfig()
        if (config.siteName) {
          setSiteName(config.siteName)
        }
      } catch (error) {
        console.error('Error fetching site name:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSiteName()
  }, [fallback])

  if (isLoading) {
    return <span className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}>{fallback}</span>
  }

  return <span className={className}>{siteName}</span>
} 