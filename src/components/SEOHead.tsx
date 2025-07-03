'use client'

import Head from 'next/head'
import { usePathname } from 'next/navigation'

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedAt?: string
  author?: string
  keywords?: string[]
  canonicalUrl?: string
  siteConfig?: {
    title: string
    description: string
    url: string
    logo?: {
      url?: string
      alt?: string
    }
    seo?: {
      defaultMetaTitle?: string
      defaultMetaDescription?: string
      defaultMetaImage?: string
      googleAnalyticsId?: string
      googleTagManagerId?: string
    }
  }
}

export default function SEOHead({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedAt,
  author,
  keywords = [],
  canonicalUrl,
  siteConfig,
}: SEOHeadProps) {
  const pathname = usePathname()
  const siteUrl = siteConfig?.url || process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  
  // Valores por defecto
  const defaultTitle = siteConfig?.seo?.defaultMetaTitle || siteConfig?.title || 'Mi Sitio Web'
  const defaultDescription = siteConfig?.seo?.defaultMetaDescription || siteConfig?.description || 'Descripción por defecto del sitio'
  const defaultImage = siteConfig?.seo?.defaultMetaImage || `${siteUrl}/og-image.jpg`
  
  // Valores finales
  const finalTitle = title ? `${title} | ${defaultTitle}` : defaultTitle
  const finalDescription = description || defaultDescription
  const finalImage = image || defaultImage
  const finalUrl = url || `${siteUrl}${pathname}`
  const finalCanonical = canonicalUrl || finalUrl

  // Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebPage',
    '@id': finalCanonical,
    url: finalCanonical,
    name: finalTitle,
    description: finalDescription,
    image: finalImage,
    ...(type === 'article' && {
      datePublished: publishedAt,
      dateModified: publishedAt,
      author: author ? {
        '@type': 'Person',
        name: author,
      } : undefined,
      publisher: {
        '@type': 'Organization',
        name: defaultTitle,
        logo: {
          '@type': 'ImageObject',
          url: siteConfig?.logo?.url || `${siteUrl}/logo.png`,
        },
      },
    }),
    ...(type === 'website' && {
      mainEntity: {
        '@type': 'WebSite',
        '@id': siteUrl,
        name: defaultTitle,
        description: defaultDescription,
      },
    }),
  }

  return (
    <Head>
      {/* Meta tags básicos */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={finalCanonical} />
      
      {/* Keywords */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:locale" content="es_ES" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      
      {/* Article specific meta tags */}
      {type === 'article' && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Google Analytics */}
      {siteConfig?.seo?.googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.seo.googleAnalyticsId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${siteConfig.seo.googleAnalyticsId}');
              `,
            }}
          />
        </>
      )}

      {/* Google Tag Manager */}
      {siteConfig?.seo?.googleTagManagerId && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${siteConfig.seo.googleTagManagerId}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${siteConfig.seo.googleTagManagerId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Preconnect para optimización */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  )
} 