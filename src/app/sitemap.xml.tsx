import { sanityClient } from '@/lib/sanity'
import { sitemapQuery } from '@/lib/queries'
import { NextResponse } from 'next/server'

export const revalidate = 60

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tusitio.com'
  const data = await sanityClient.fetch(sitemapQuery)

  let urls: string[] = []

  // Página principal
  urls.push(`<url><loc>${baseUrl}</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`)

  // Artículos
  if (data.articles) {
    urls = urls.concat(
      data.articles.map((a: any) =>
        `<url><loc>${baseUrl}/blog/${a.slug.current}</loc><lastmod>${a.publishedAt?.split('T')[0]}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
      )
    )
  }
  
  // Páginas
  if (data.pages) {
    urls = urls.concat(
      data.pages.map((p: any) =>
        `<url><loc>${baseUrl}/pages/${p.slug.current}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`
      )
    )
  }
  
  // Categorías
  if (data.categories) {
    urls = urls.concat(
      data.categories.map((c: any) =>
        `<url><loc>${baseUrl}/categorias/${c.slug.current}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`
      )
    )
  }
  
  // Autores
  if (data.authors) {
    urls = urls.concat(
      data.authors.map((a: any) =>
        `<url><loc>${baseUrl}/autor/${a.slug.current}</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`
      )
    )
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
} 