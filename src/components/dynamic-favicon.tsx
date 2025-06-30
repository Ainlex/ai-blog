'use client'

import { useEffect } from 'react'
import { getSiteConfig } from '@/lib/notion'

export function DynamicFavicon() {
  useEffect(() => {
    async function updateFavicon() {
      try {
        const config = await getSiteConfig()
        
        if (config.faviconUrl) {
          // Crear un nuevo link element para el favicon
          const link = document.createElement('link')
          link.rel = 'icon'
          link.type = 'image/x-icon'
          link.href = config.faviconUrl
          
          // Remover favicon anterior si existe
          const existingFavicon = document.querySelector('link[rel="icon"]')
          if (existingFavicon) {
            existingFavicon.remove()
          }
          
          // Agregar el nuevo favicon
          document.head.appendChild(link)
        }
      } catch (error) {
        console.error('Error updating favicon:', error)
      }
    }

    updateFavicon()
  }, [])

  return null // Este componente no renderiza nada visual
} 