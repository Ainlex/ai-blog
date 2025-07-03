'use client'

import { useEffect } from 'react'
import { sanityClient } from '@/lib/sanity'
import { siteConfigQuery } from '@/lib/queries'

export function DynamicFavicon() {
  useEffect(() => {
    async function updateFavicon() {
      try {
        const config = await sanityClient.fetch(siteConfigQuery)
        
        if (config?.favicon?.asset?.url) {
          // Crear un nuevo link element para el favicon
          const link = document.createElement('link')
          link.rel = 'icon'
          link.type = 'image/x-icon'
          link.href = config.favicon.asset.url
          
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