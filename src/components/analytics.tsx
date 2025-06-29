'use client'

import { useEffect } from 'react'

interface AnalyticsProps {
  gaId?: string
}

export function Analytics({ gaId }: AnalyticsProps) {
  const googleAnalyticsId = gaId || process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    if (!googleAnalyticsId) {
      console.warn('Google Analytics ID no configurado. Configura NEXT_PUBLIC_GA_ID para habilitar analytics.')
      return
    }

    // Cargar Google Analytics
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`
    document.head.appendChild(script)

    // Configurar gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', googleAnalyticsId)

    // Limpiar script al desmontar
    return () => {
      document.head.removeChild(script)
    }
  }, [googleAnalyticsId])

  if (!googleAnalyticsId) {
    return null
  }

  return (
    <>
      {/* Google Analytics Script */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `,
        }}
      />
    </>
  )
}

// Declaración global para TypeScript
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
} 