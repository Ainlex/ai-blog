export const seoConfig = {
  defaultTitle: 'PromptLab - Inteligencia Artificial y Tecnología',
  defaultDescription: 'Descubre las últimas noticias, herramientas y guías sobre Inteligencia Artificial, Machine Learning y tecnología.',
  defaultImage: '/og-image.jpg',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://tusitio.com',
  siteName: 'PromptLab',
  twitterHandle: '@tuhandle',
  locale: 'es_ES',
  type: 'website',
  
  // Configuración para diferentes tipos de páginas
  pages: {
    home: {
      title: 'Inicio - PromptLab',
      description: 'Bienvenido a PromptLab, tu blog sobre Inteligencia Artificial y tecnología. Encuentra artículos, tutoriales y recursos.',
      keywords: ['inteligencia artificial', 'machine learning', 'tecnología', 'blog', 'tutoriales'],
    },
    blog: {
      title: 'Blog - Artículos sobre IA y Tecnología',
      description: 'Artículos, tutoriales y recursos sobre Inteligencia Artificial, Machine Learning y tecnología.',
      keywords: ['blog', 'artículos', 'inteligencia artificial', 'machine learning'],
    },
    categories: {
      title: 'Categorías - Explora por Temas',
      description: 'Explora artículos organizados por categorías: Machine Learning, Deep Learning, Herramientas de IA y más.',
      keywords: ['categorías', 'temas', 'machine learning', 'deep learning'],
    },
    search: {
      title: 'Búsqueda - Encuentra Contenido',
      description: 'Busca en nuestro archivo de artículos sobre Inteligencia Artificial y tecnología.',
      keywords: ['búsqueda', 'artículos', 'inteligencia artificial'],
    },
  },
  
  // Configuración para redes sociales
  social: {
    twitter: {
      card: 'summary_large_image' as const,
      site: '@tuhandle',
      creator: '@tuhandle',
    },
    facebook: {
      appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
    },
  },
  
  // Configuración para Google Analytics y Tag Manager
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID,
  },
  
  // Configuración para robots y sitemap
  robots: {
    userAgent: '*',
    allow: '/',
    disallow: ['/studio', '/api'],
    sitemap: '/sitemap.xml',
  },
}

// Función para generar títulos SEO
export function generateSEOTitle(pageTitle?: string, siteTitle?: string): string {
  const title = siteTitle || seoConfig.defaultTitle
  return pageTitle ? `${pageTitle} | ${title}` : title
}

// Función para generar descripciones SEO
export function generateSEODescription(description?: string): string {
  return description || seoConfig.defaultDescription
}

// Función para generar URLs canónicas
export function generateCanonicalUrl(path: string): string {
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '')
  const cleanPath = path.replace(/\/$/, '')
  return `${baseUrl}${cleanPath}`
}

// Función para generar structured data básico
export function generateBasicStructuredData({
  title,
  description,
  url,
  type = 'WebPage',
  image,
  publishedAt,
  modifiedAt,
}: {
  title: string
  description: string
  url: string
  type?: string
  image?: string
  publishedAt?: string
  modifiedAt?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': url,
    url,
    name: title,
    description,
    ...(image && { image }),
    ...(publishedAt && { datePublished: publishedAt }),
    ...(modifiedAt && { dateModified: modifiedAt }),
  }
} 