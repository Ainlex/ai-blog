import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/notion'

const locales = ['es', 'en']
const staticPages = ['/', '/blog', '/apoyanos', '/categorias']
const siteUrl = 'https://tudominio.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls = locales.flatMap(lang =>
    staticPages.map(page => ({
      url: `${siteUrl}/${lang}${page === '/' ? '' : page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  )

  try {
    // Dynamic pages from blog posts
    const posts = await getPosts()
    
    const postPages = posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Category pages
    const categories = ['herramientas', 'guias', 'noticias', 'tutoriales', 'tendencias', 'casos-uso']
    const categoryPages = categories.map((category) => ({
      url: `${siteUrl}/categorias/${category}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    return [...urls, ...postPages, ...categoryPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return urls
  }
} 