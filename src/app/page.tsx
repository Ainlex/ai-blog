import Link from 'next/link'
import { sanityClient, getDataWithRevalidation } from '@/lib/sanity'
import { allArticlesQuery, siteConfigQuery } from '@/lib/queries'
import SEOHead from '@/components/SEOHead'
import StructuredData, { createWebsiteStructuredData } from '@/components/StructuredData'
import Image from 'next/image'
import { getSanityImageUrl } from '@/lib/sanityImage'
import { HeroSection } from '@/components/hero-section'
import { NewsletterSection } from '@/components/newsletter-section'

export const revalidate = 60

async function getArticles() {
  try {
    return await getDataWithRevalidation(allArticlesQuery, 60) || []
  } catch (error) {
    console.warn('Error fetching articles:', error)
    return []
  }
}

async function getSiteConfig() {
  try {
    return await sanityClient.fetch(siteConfigQuery)
  } catch (error) {
    console.warn('Error fetching site config:', error)
    return null
  }
}

export default async function HomePage() {
  const articles = await getArticles()
  const siteConfig = await getSiteConfig() || {
    title: 'PromptLab',
    description: 'Blog sobre Inteligencia Artificial y Tecnología',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tusitio.com',
    logo: { url: null, alt: 'Logo del blog' }
  }

  const structuredData = createWebsiteStructuredData({
    name: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: siteConfig.logo?.url || '',
  })

  // Filtrar artículos destacados (máx. 6)
  const featuredArticles = articles.filter((a: any) => a.featured).slice(0, 6)
  // Filtrar artículos NO destacados
  const nonFeaturedArticles = articles.filter((a: any) => !a.featured)

  return (
    <>
      <SEOHead
        title={siteConfig.title}
        description={siteConfig.description}
        image={siteConfig.logo?.url}
        url={siteConfig.url}
        type="website"
        siteConfig={siteConfig}
      />
      <StructuredData data={structuredData} />
      <HeroSection />
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Título de Artículos Destacados */}
        <h2 className="text-3xl font-extrabold mb-8 text-blue-600 dark:text-blue-400 text-center">Artículos Destacados</h2>
        {/* Sección de Artículos Destacados */}
        {featuredArticles.length > 0 && (
          <section className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article: any) => (
                <article key={article._id} className="card flex flex-col">
                  {article.mainImage?.url && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={getSanityImageUrl({ src: article.mainImage.url })}
                        alt={article.mainImage.alt || article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <Link href={`/blog/${article.slug.current}`} className="text-lg font-bold text-blue-700 dark:text-blue-300 hover:underline mb-2 line-clamp-2">
                      {article.title}
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">{article.excerpt}</p>
                    <span className="text-xs text-gray-400 mt-auto">
                      {new Date(article.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Sección de Últimos artículos (solo no destacados, diseño mejorado) */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Últimos artículos</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {nonFeaturedArticles.map((article: any) => (
              <li key={article._id} className="card flex flex-col">
                {article.mainImage?.url && (
                  <div className="relative h-36 w-full">
                    <Image
                      src={getSanityImageUrl({ src: article.mainImage.url })}
                      alt={article.mainImage.alt || article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <Link href={`/blog/${article.slug.current}`} className="text-lg font-bold text-blue-700 dark:text-blue-300 hover:underline mb-1 line-clamp-2">
                    {article.title}
                  </Link>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{article.excerpt}</p>
                  <span className="text-xs text-gray-400 mt-auto">
                    {new Date(article.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <NewsletterSection />
    </>
  )
} 