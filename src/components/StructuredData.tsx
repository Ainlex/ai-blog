import Script from 'next/script'

interface StructuredDataProps {
  data: any
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

// Helper para crear structured data de artículo
export function createArticleStructuredData({
  title,
  description,
  image,
  url,
  publishedAt,
  modifiedAt,
  author,
  publisher,
  keywords = [],
  logo,
}: {
  title: string
  description: string
  image: string
  url: string
  publishedAt: string
  modifiedAt?: string
  author: string
  publisher: string
  keywords?: string[]
  logo?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    url,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: publisher,
      logo: {
        '@type': 'ImageObject',
        url: logo || `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
    ...(keywords.length > 0 && { keywords: keywords.join(', ') }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}

// Helper para crear structured data de sitio web
export function createWebsiteStructuredData({
  name,
  description,
  url,
  logo,
}: {
  name: string
  description: string
  url: string
  logo: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
    logo,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// Helper para crear structured data de organización
export function createOrganizationStructuredData({
  name,
  description,
  url,
  logo,
  socialProfiles = [],
}: {
  name: string
  description: string
  url: string
  logo: string
  socialProfiles?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    description,
    url,
    logo,
    ...(socialProfiles.length > 0 && {
      sameAs: socialProfiles,
    }),
  }
}

// Helper para crear structured data de breadcrumbs
export function createBreadcrumbStructuredData({
  items,
}: {
  items: Array<{ name: string; url: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
} 