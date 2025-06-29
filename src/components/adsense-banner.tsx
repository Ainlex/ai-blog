'use client'

interface AdSenseBannerProps {
  clientId?: string
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle'
  responsive?: boolean
  className?: string
}

export function AdSenseBanner({
  clientId,
  slot,
  format = 'auto',
  responsive = true,
  className = '',
}: AdSenseBannerProps) {
  const adsenseClientId = clientId || process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  if (!adsenseClientId) {
    return (
      <div className={`ad-banner ${className} bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center`}>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Espacio para anuncio de Google AdSense
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
          Configura NEXT_PUBLIC_ADSENSE_CLIENT_ID para mostrar anuncios
        </p>
      </div>
    )
  }

  return (
    <div className={`ad-banner ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsenseClientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
      <script>
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </script>
    </div>
  )
} 