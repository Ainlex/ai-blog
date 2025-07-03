'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useRef } from 'react'

export function useOptimizedNavigation() {
  const router = useRouter()
  const isNavigating = useRef(false)

  const navigate = useCallback((href: string, options?: { replace?: boolean }) => {
    if (isNavigating.current) {
      return
    }

    isNavigating.current = true

    // Usar setTimeout para permitir que el estado se actualice
    setTimeout(() => {
      if (options?.replace) {
        router.replace(href)
      } else {
        router.push(href)
      }
      
      // Resetear el flag después de un breve delay
      setTimeout(() => {
        isNavigating.current = false
      }, 100)
    }, 0)
  }, [router])

  const replace = useCallback((href: string) => {
    navigate(href, { replace: true })
  }, [navigate])

  return {
    navigate,
    replace,
    isNavigating: isNavigating.current
  }
} 